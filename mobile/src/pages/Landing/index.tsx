import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';		// Controle de Navegação
import { RectButton } from 'react-native-gesture-handler';	// Botão funciona de acordo com o SO

import api from '../../services/api';

import styles from './styles';

import LandingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';


function Landing() {
	const { navigate } = useNavigation()
	const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
      api.get('connections').then(response => {
        const { total } = response.data;

        setTotalConnections(total)
      })
    }, [])

	function handleNavigationToGIveClassesPage() {
		navigate('GiveClasses');
	}

	function handleNavigationToStudyPages() {
		navigate('Study')
	}

	return (
	<View style={styles.container}>
		<Image source={LandingImg} style={styles.banner} />

		<Text style={styles.title}>
			Seja bem-vindo,{'\n'}
			<Text style={styles.titleBold}>
				O que deseja fazer?
			</Text>
		</Text>

		<View style={styles.buttonsContainer}>
			<RectButton
			onPress={handleNavigationToStudyPages}
			style={[styles.button,styles.buttonPrimary]}
			>
				<Image source={studyIcon} />
				<Text style={styles.buttonText}> Estudar </Text>
			</RectButton>

			<RectButton
				onPress={handleNavigationToGIveClassesPage}
				style={[styles.button, styles.buttonSecondary]}
			>
				<Image source={giveClasses} />
				<Text style={styles.buttonText}> Dar aulas </Text>
			</RectButton>
		</View>

		<Text style={styles.totalConnectios}>
			Total de {totalConnections} conexões já realizadas {' '}
			<Image source={heartIcon} />
		</Text>

	</View>
	);
}

export default Landing;