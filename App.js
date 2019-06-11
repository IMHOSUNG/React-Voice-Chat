/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Platform, createMaterialTopTabNavigator,createBottomTabNavigator ,createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';
import AuthLoadingScreen from './screen/AuthLoadingScreen';
import VoiceChat from './screen/VoiceChat';
import RoomScreen from './screen/RoomScreen';
import MakeRoomScreen from './screen/NewRoomScreen';
import ProfileScreen from './screen/ProfileScreen';
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const HomeStack = createStackNavigator(
  {
    Home : HomeScreen,
    Profile : ProfileScreen,
  }
);

const ChatStack = createStackNavigator(
  {
     Room : RoomScreen,
     Chat : VoiceChat,
     MakeRoom : MakeRoomScreen
  }
);

ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index == 1) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const AppStack = createMaterialTopTabNavigator(
  { 
    Home: HomeStack ,  
    Room : ChatStack, 
    Setting : ProfileScreen,
  },
  {
    bounces: true,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
        iconStyle: {height: 50},
        activeTintColor: '#0000',
        inactiveTintColor: '#d1cece',
        upperCaseLabel: false,
        showLabel: true,
        showIcon: true,
    }
});

const AuthStack = createStackNavigator(
  { Login: LoginScreen  }
);

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