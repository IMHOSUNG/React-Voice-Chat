import {createMaterialTopTabNavigator,createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import VoiceChat from './src/screens/VoiceChat';
import RoomScreen from './src/screens/RoomScreen';
import MakeRoomScreen from './src/screens/NewRoomScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import FriendProfileScreen from './src/screens/FriendProfileScreen';
import SettingScreen from './src/screens/SettingScreen'
import {Platform} from 'react-native';
import {Icon} from 'native-base';
import React from 'react';

// 배포 전 false 로 바꾸고 에러 고칠 것
console.disableYellowBox = true;

const HomeStack = createStackNavigator(
  {
    Home : HomeScreen,
    MyProfile : MyProfileScreen,
    FriendProfile : FriendProfileScreen,
  },
  {
    navigationOptions : ({ navigation }) => {
      let tabBarVisible = true;
      let swipeEnabled = true;

      return { tabBarVisible , swipeEnabled}
    }
  },
);

const ChatStack = createStackNavigator(
  {
     Room : RoomScreen,
     Chat : VoiceChat,
     MakeRoom : MakeRoomScreen
  },
  {
    navigationOptions : ({ navigation }) => {
      let tabBarVisible = true;
      let swipeEnabled = true;
      if (navigation.state.index == 1) {
        tabBarVisible = false;
        swipeEnabled = false;
      }
      return { tabBarVisible , swipeEnabled}
    }
  },
);

const SettingStack = createStackNavigator(
  {
    Setting : SettingScreen
  },
  {
    navigationOptions : ({ navigation }) => {
      let tabBarVisible = true;
      let swipeEnabled = true;
      return { tabBarVisible , swipeEnabled}
    }
  },
);

const AppStack = createMaterialTopTabNavigator(
  { 
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name = 'ios-person' style = {{color: tintColor}}/>
        )
      }
    },  
    Room : {
      screen: ChatStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name = 'ios-chatbubbles' style = {{color:tintColor}}/>
        )
      }
    }, 
    Setting : {
      screen: SettingStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name = 'ios-settings' style = {{color:tintColor}}/>
        )
      }
    }
  },
  {
    bounces: true,
    animationEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
        style: {
            ...Platform.select({
                ios:{
                    backgroundColor: 'white',
                },
                android:{
                    backgroundColor:'white',
                }
            })
        },
        iconStyle: {height: 30},
        activeTintColor: '#0000',
        inactiveTintColor: '#d1cece',
        upperCaseLabel: false,
        showLabel: false,
        showIcon: true,
    }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen, 
    App: AppStack,
    Auth: LoginScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));