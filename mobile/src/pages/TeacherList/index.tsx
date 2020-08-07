import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles'

function TeacherList() {
	const [ subject, setSubject ] = useState('')
	const [ week_day, setWekDay ] = useState('')
	const [ time, setTime ] = useState('')

	//Carregar professores favoritos
	const [favorites, setFavorites] = useState<number[]>([]);	// Informar tipo: array de numero
	function loadFavorites() {
		AsyncStorage.getItem('favorites').then(response => {
			if (response){
				const favoritedTeachers = JSON.parse(response);
				const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
					return teacher.id
				})

				setFavorites(favoritedTeachersIds);
			}
		});
	}

	// Mostrar/Ocultar os campos de busca (matéria, dia, horário)
	const [ isFiltersVisible, setIsFilteersVisible ] = useState(false);
	function handleToggleFiltersVisible() {
		setIsFilteersVisible(!isFiltersVisible);  // Inverte o estado de "isFiltersVisible"
	}

	// Enviar dados para pesquisar Proffys
	const [teachers, setTeachers] = useState([]);
	async function handleFiltersSubmit() {
		loadFavorites();
		const response = await api.get('classes', {
			params: {
				subject,
				week_day,
				time,
			}
		});

		setIsFilteersVisible(false);
		setTeachers(response.data);
	}

	return(
		<View style={styles.container}>
			<PageHeader 
				title="Proffys disponíveis"
				headerRigth={(
					<BorderlessButton onPress={handleToggleFiltersVisible}>
						<Feather name="filter" size={20} color="#FFF" />
					</BorderlessButton>
				)}
			>
				{ isFiltersVisible && (
					<View style={styles.searchForm}>
						<Text style={styles.label}>Matéria</Text>
						<TextInput
							style={styles.input}
							value={subject}
							onChangeText={text => setSubject(text)}
							placeholder="Qual a materia?"
							placeholderTextColor="#C1BCCC"
						/>

						<View style={styles.inputGroup}>
							<View style={styles.inputBlock}>
								<Text style={styles.label} > Dia da semana </Text>
								<TextInput
									style={styles.input}
									value={week_day}
									onChangeText={text => setWekDay(text)}
									placeholder="Qual o dia?"
									placeholderTextColor="#C1BCCC"
								/>
							</View>

							<View style={styles.inputBlock}>
								<Text style={styles.label} > Horário </Text>
								<TextInput
									style={styles.input}
									value={time}
									onChangeText={text => setTime(text)}
									placeholder="Qual horário?"
									placeholderTextColor="#C1BCCC"
								/>
							</View>
						</View>

						<RectButton 
							style={styles.submitButton}
							onPress={handleFiltersSubmit}
						>
							<Text style={styles.submitButtonText}>Filtrar </Text>
						</RectButton>
					</View>
				)}
			</PageHeader>

			<ScrollView
				style={styles.teacherlist}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 30
				}}
			>
				{teachers.map((teacher: Teacher) => {
					return(
					<TeacherItem
						key={teacher.id}
						teacher={teacher}
						favorited={favorites.includes(teacher.id)}
					/>
					);
				})}
			</ScrollView>
		</View>
	)
}

export default TeacherList;