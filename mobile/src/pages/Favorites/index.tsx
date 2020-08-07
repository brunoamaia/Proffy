import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles'
import {  } from 'react-native-gesture-handler';

function Favorites() {
  const [favorites, setFavorites] = useState([]);	// Informar tipo: array de numero
	function loadFavorites() {
		AsyncStorage.getItem('favorites').then(response => {
			if (response){
				const favoritedTeachers = JSON.parse(response);

				setFavorites(favoritedTeachers);
			}
		});
  }

  // Recarrega a tela toda vez que clicar na aba "favoritos"
  // Faz esa estrutura por causa da navegação em abas
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )
  
  return(
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherlist}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 30
        }}
      >
        {favorites.map( (teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={true}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Favorites;