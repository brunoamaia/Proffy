import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';  // Como o botãp é um ícone, usa esse item que seixa "sem fundo"

import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'


import styles from './styles';

interface PageHeaderProps {
  title: string;
  headerRigth?: ReactNode;     // Recebe um elemento do React, qu é opcional
}

const PageHeader: React.FC<PageHeaderProps> = ({ children, headerRigth, title}) => {
  const { navigate } = useNavigation()
  function handleGoBack(){
    navigate('Landing');
  }
  
  return(
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}> { title } </Text>
        {headerRigth}
      </View>
      
      {children}
    </View>
  );
}

export default PageHeader;