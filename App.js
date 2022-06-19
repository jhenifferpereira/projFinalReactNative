import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateComponent from './components/CreateComponent';
import ReadComponent from './components/ReadComponent';
import UpdateComponent from './components/UpdateComponent';

const Stack = createStackNavigator();

function CrudStack() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
      <Stack.Screen 
        name="CreateComponent" 
        component={CreateComponent} 
        options={{ title: 'Create' }}
      />
      <Stack.Screen 
        name="ReadComponent" 
        component={ReadComponent} 
        options={{ title: 'List' }}
      />
      <Stack.Screen 
       name="UpdateComponent" 
       component={UpdateComponent} 
       options={{ title: 'Update' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <CrudStack />
    </NavigationContainer>
  );
}