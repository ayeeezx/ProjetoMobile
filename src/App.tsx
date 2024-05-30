import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './navigation/HomeNavigator';



const App = () => {
  return (
    <NavigationContainer>
      <HomeNavigator/>
    </NavigationContainer>
  );
}

export default App;