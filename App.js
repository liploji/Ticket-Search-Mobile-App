import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './components/HomeScreen';
import EventDetails from './components/EventDetails';
import LoginScreen from './components/LoginScreen';
import SearchScreen from './components/SearchScreen';
import CheckoutPage from './components/CheckoutPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal'
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Checkout" component={CheckoutPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


export default App;
