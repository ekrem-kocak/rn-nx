import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '@rn-nx/store';
import { RegisterScreen, LoginScreen, TodoScreen } from '@rn-nx/features';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName={user ? 'Todo' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
