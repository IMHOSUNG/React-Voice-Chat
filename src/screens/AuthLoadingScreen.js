import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Alert
} from 'react-native';

import User from '../config/User';
import firebase from 'firebase'
import FireBaseConfig from '../config/FireBaseConfig';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

   componentWillMount(){
    const firebaseConfig = 
    {
        apiKey: FireBaseConfig.apiKey,
        authDomain: FireBaseConfig.authDomain,
        databaseURL: FireBaseConfig.databaseURL,
        projectId: FireBaseConfig.projectId,
        storageBucket: FireBaseConfig.storageBucket,
        messagingSenderId: FireBaseConfig.messagingSenderId,
        appId: FireBaseConfig.appId
      };
    // Initialize Firebase
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) :firebase.app()
   }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}