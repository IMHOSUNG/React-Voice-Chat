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
import firebase from 'firebase';

export default class RoomScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
          title: '대화 목록',
          headerRight: <Button
                           title=" + " 
                           onPress={ () => navigation.navigate('MakeRoom')} />
        };
      };

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

    _hideRoom = (item) =>{
        Alert.alert(item.roomKeyId);
    }

    _checkHide = (item) => {

        Alert.alert(
            '삭제',
            item.roomName + '을 삭제하시겠습니까?',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {this._hideRoom(item)},
              },
            ],
            {cancelable: false},
          );
    }

    
    renderRow = ({item}) =>{
        return(
            <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('Chat', item)} 
                onLongPress = {() => this._checkHide(item)}
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
            </SafeAreaView> 
        )
    }
}