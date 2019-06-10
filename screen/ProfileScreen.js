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
import User from '../User';
import styles from '../design/styles';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title : 'Profile'
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

    renderRow = ({item}) =>{
        return(
            <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('Profile', item)} 
                style={{padding:10, borderBottomColor:'#ccc', borderBottomWidth:1 }}>
                <Text style ={{fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    
    render(){
        return(
            <SafeAreaView>
                <Button onPress={this._logOut} title="Logout"/>
            </SafeAreaView>          
        )
    }
}