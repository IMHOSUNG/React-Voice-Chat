/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {AsyncStorage, Alert, TouchableOpacity ,Platform, StyleSheet, TextInput ,Text, View} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';
import firebase from 'firebase';
import User from '../User';
import styles from '../design/styles';

export default class LoginScreen extends React.Component{
    static navigationOptions = {
        header : null
    }
  state = {
    phone : '',
    name : ''
  }

  handleChange = key => val =>{
    this.setState({[key] : val })
  }

  submitForm = async () => {
    if(this.state.phone.length < 3){
        Alert.alert('Error','Wrong phone')
    }else if(this.state.name.length < 5){
        Alert.alert('Error','Wrong name')
    }else{
        //유저 정보 저장
        await AsyncStorage.setItem('userPhone',this.state.phone);
        User.phone = this.state.phone;
        firebase.database().ref('users/'+User.phone).set({name:this.state.name});
        this.props.navigation.navigate('App');
    }
    
  }

  // TextInput 설정 및 키 값을 통해 handle 값 처리 
  render() {
    return (
      <View style={styles.container}>
          
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            value={this.state.phone}
            onChangeText={this.handleChange('phone')}
          />
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={this.state.name}
            onChangeText={this.handleChange('name')}
          />
          <TouchableOpacity onPress={this.submitForm}>
            <Text style={styles.btnText}>Enter</Text>
          </TouchableOpacity>
      </View>
    );
  }
}


