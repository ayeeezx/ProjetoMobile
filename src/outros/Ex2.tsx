// InitialScreen.tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InitialScreen = () => {
  const navigation = useNavigation();

  const navigateToExercise1 = () => {
    navigation.navigate('Ex1');
  }

  const navigateToExercise3 = () => {
    navigation.navigate('Ex3');
  }

  return (
    <View>
      <Button title="Exercício 1" onPress={navigateToExercise1} />
      <Button title="Exercício 3" onPress={navigateToExercise3} />
    </View>
  );
}

export default InitialScreen;
``