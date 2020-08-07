import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles';

function TeacherItem() {
  return(
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://github.com/brunoamaia.png'}}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Bruno Maia</Text>
          <Text style={styles.subject}> Matemática </Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Vamo que vamo.
        {'\n \n'}
        E ae?? Apaixonado por tecnologia. 
        Estou iniciando no universo da programação. 
        Atualmente estou estudando Desenvolvimento Web e Mobile.
      </Text>

      <View style={styles.footer} >
        <Text style={styles.price} >
          Preço/Hora {' '}
          <Text style={styles.pricevalue}>
            R$ 20,00
          </Text>
        </Text>

        <View style={styles.buttonsContainer} >
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavoriteIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>
              Entrar em contato
            </Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;