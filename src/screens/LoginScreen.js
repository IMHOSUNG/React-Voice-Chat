import React from 'react';
import {AsyncStorage, Alert, TouchableOpacity ,Platform, StyleSheet, TextInput ,Text, View, KeyboardAvoidingView,ScrollView} from 'react-native';
import firebase from 'firebase';
import User from '../config/User';
import colors from '../styles/colors';
import Notification from '../components/Notification';
import InputField from '../components/forms/InputField';
import NextArrowButton from '../components/buttons/NextArrowButton';

export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        formValid : true,
        phone : '',
        name : ''
    }
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
  }

  handleNextButton = async() => {
    if(this.state.phone.length < 3 || this.state.name.length < 5){
      this.setState({formValid : false});
    }else{
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({name : this.state.name});
      this.props.navigation.navigate('App');
    }
  }

  handleChange = key => val =>{
    this.setState({[key] : val })
  }

  handleCloseNotification() {
    this.setState({formValid : true});
  }

  // TextInput 설정 및 키 값을 통해 handle 값 처리 
  render() {
    const {formValid} = this.state;
    const showNotification = formValid ? false : true;
    const background = formValid ? colors.green01 : colors.darkOrange;
    return (
      <KeyboardAvoidingView
        style = {[{backgroundColor: background}, styles.wrapper]}>
        <View style = {styles.scrollViewWrapper}>
          <ScrollView style = {styles.scrollView}>
            <Text style = {styles.loginHeader}>Log in</Text>
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize = {14}
              labelColor= {colors.white}
              textColor={colors.white}
              borderBottomColor = {colors.white}
              inputType = "email"
              customStyle = {{marginBottom : 30}}
              handler = {this.handleChange}
            />
            <InputField
              labelText="PASSWORD"
              labelTextSize = {14}
              labelColor= {colors.white}
              textColor={colors.white}
              borderBottomColor = {colors.white}
              inputType='password'
              customStyle = {{marginBottom : 30}}
              handler = {this.handleChange}
            />
          </ScrollView>
          <View style = {styles.nextButton}>
              <NextArrowButton
                handleNextButton = {this.handleNextButton}
              />
          </View>
          <View style = {showNotification ? {} : {}}>
              <Notification
                  showNotification= {showNotification}
                  handleCloseNotification = {this.handleCloseNotification}
                  type = "Error"
                  firstLine="Those credentials don't look right."
                  secondLine="Please Try again."
              />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper : {
    display: 'flex',
    flex: 1,
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  loginHeader: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 20,
  }
});
