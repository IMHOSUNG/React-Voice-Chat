import React from 'react';
import {
TextInput,
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

export default class NewRoomScreen extends React.Component {
    static navigationOptions = {
        title : 'MakeRoom'
    }

    state ={
        roomName : '',
        roomInfo : '',
        name : '',
        phone : '',
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    submitForm = () => {
            //유저 정보 저장
        //await AsyncStorage.setItem('userPhone',this.state.phone);
        let roomId = firebase.database().ref('rooms').push().key;
        let updates = {};
        let room = {
            roomName : this.state.roomName,
            roomInfo : this.state.roomInfo,
            roomMaker : User.phone,
            name : User.name,
            phone : User.phone,
            roomKeyId : roomId,
        }
        updates['rooms/'+roomId] = room;
        firebase.database().ref().update(updates);
        this.props.navigation.navigate('Room');      
    }

    handleChange = key => val =>{
        this.setState({[key] : val })
    }

    render(){
        return(
            <View style={styles.container}>
            <TextInput
              placeholder="Room Name"
              style={styles.input}
              value={this.state.roomName}
              onChangeText={this.handleChange('roomName')}
            />
            <TextInput
              placeholder="roomInfo"
              style={styles.input}
              value={this.state.roomInfo}
              onChangeText={this.handleChange('roomInfo')}
            />
            <TouchableOpacity onPress={this.submitForm}>
              <Text style={styles.btnText}>Enter</Text>
            </TouchableOpacity>
            </View>      
        )
    }
}