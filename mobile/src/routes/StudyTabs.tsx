import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Favorites from '../pages/Favorites';
import TeacherList from '../pages/TeacherList';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return(
    <Navigator >
      <Screen name="Favorites" component={Favorites} />
      <Screen name="TeacherList" component={TeacherList} />
    </Navigator>
  );
}

export default StudyTabs;