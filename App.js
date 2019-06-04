/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';
import AuthLoadingScreen from './screen/AuthLoadingScreen';
import VoiceChat from './screen/VoiceChat';
import RoomScreen from './screen/RoomScreen';
import MakeRoomScreen from './screen/NewRoomScreen';
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator({ Home: HomeScreen , Chat : VoiceChat, Room : RoomScreen, MakeRoom : MakeRoomScreen});
const AuthStack = createStackNavigator({ Login: LoginScreen  });

//배포하기 전 용도
console.disableYellowBox = true;

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen, 
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));