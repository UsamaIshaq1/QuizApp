import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Score from '../screens/Score';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader'
const Stack = createStackNavigator();
export default function Routes() {
    const isLogin = useSelector(state => state.Auth.isLogin)
  return (
    <NavigationContainer>
      <Loader/>
     
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>

    </NavigationContainer>
  );
}

