import React, { useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

export interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ favorited, teacher }) => {
  function handleLinkToWhatsapp() {
    api.post('connections', {
      user_id: teacher.id,
    })
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }

  // Toda informação que pode ser manipulada pelo usuário, deve estar em um "useState"
  // Aqui é para fovoritar/desfavoritar um Proffy
  // Vai pegar o estado que o usuário tem, e pode ser modificado
  const [isFavorited, setIsFavorited] = useState(favorited)
  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray = []
    if (favorites) {
      favoritesArray = JSON.parse(favorites)
    }
    
    if (isFavorited){
      // Remover dos favoritos
      let favoriteIndex = favoritesArray.findIndex((TeacherItem: Teacher) => {
        return TeacherItem.id === teacher.id;
      });

      favoritesArray.splice(favoriteIndex, 1)
      setIsFavorited(false);
    } else {
      // Adicionar aos favoritos
      favoritesArray.push(teacher)
      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }

  return(
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}> {teacher.name} </Text>
          <Text style={styles.subject}> {teacher.subject} </Text>
        </View>
      </View>

      <Text style={styles.bio}> {teacher.bio} </Text>

      <View style={styles.footer} >
        <Text style={styles.price} >
          Preço/Hora {' '}
          <Text style={styles.pricevalue}>
            R$ {teacher.cost}
          </Text>
        </Text>

        <View style={styles.buttonsContainer} >
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}
            ]}
          >
            { isFavorited
              ? <Image source={unfavoriteIcon} /> 
              : <Image source={heartOutlineIcon}/>
            }
            
          </RectButton>

          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
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