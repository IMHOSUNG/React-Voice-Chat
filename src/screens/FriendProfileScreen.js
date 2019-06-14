import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  SafeAreaView
} from 'react-native';
import User from '../config/User';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title : '프로필'
    }

    state ={
        users :[]
    }

    componentWillMount(){
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val)=>{
            let person = val.val();
            person.phone = val.key;
            if(person.phone == User.phone){
                User.name = person.name
            }else{
            this.setState((prevState) => {
                return{
                    users : [...prevState.users, person]
                }
            })
        }
        })
    }
     

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render(){
        return(
            <SafeAreaView>
                <Button onPress={this._logOut} title="FriendProfile"/>
            </SafeAreaView>          
        )
    }
}