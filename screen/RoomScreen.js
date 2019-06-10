/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  SafeAreaView,
  Alert
} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';
import firebase from 'firebase';
import User from '../User';
import styles from '../design/styles';
//import console = require('console');

export default class RoomScreen extends React.Component {
    static navigationOptions = {
        title : 'Room List'
    }

    state ={
        roomList :[]
    }

    
    componentWillMount(){
        let dbRef = firebase.database().ref('rooms');
        dbRef.on('child_added', (val)=>{
            let chatroom = val.val();
            this.setState((prevState) => {
                return{
                    roomList : [...prevState.roomList, chatroom]
                }
            })
            
        })
        
    }
    

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    
    renderRow = ({item}) =>{
        return(
            <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('Chat', item)} 
                style={{padding:10, borderBottomColor:'#ccc', borderBottomWidth:1 }}>
                <Text style ={{fontSize:20}}>{item.roomName}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <SafeAreaView>
                <FlatList
                    data = {this.state.roomList}
                    renderItem = {this.renderRow}
                    keyExtractor ={(item) => item.roomKeyId}
                />
                <Button onPress={this._logOut} title="Logout"/>
            </SafeAreaView> 
        )
    }
}