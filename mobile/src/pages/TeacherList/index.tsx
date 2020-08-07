import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';


import styles from './styles'

function TeacherList() {
  const [ isFiltersVisible, setIsFilteersVisible ] = useState(false);

  function handleToggleFiltersVisible() {
    setIsFilteersVisible(!isFiltersVisible);  // Inverte o estado de "isFiltersVisible"
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
              placeholder="Qual a materia?"
              placeholderTextColor="#C1BCCC"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label} > Dia da semana </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#C1BCCC"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label} > Horário </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#C1BCCC"
                />
              </View>
            </View>

            <RectButton style={styles.submitButton}>
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
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </ScrollView>
    </View>
  )
}

export default TeacherList;