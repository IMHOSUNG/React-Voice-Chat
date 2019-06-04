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
        title : 'Home'
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
                onPress = {() => this.props.navigation.navigate('Chat', item)} 
                style={{padding:10, borderBottomColor:'#ccc', borderBottomWidth:1 }}>
                <Text style ={{fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    _roomInfo = () => {
        this.props.navigation.navigate('Room');
    }
    
    render(){
        return(
            <SafeAreaView>
                <FlatList
                    data = {this.state.users}
                    renderItem = {this.renderRow}
                    keyExtractor ={(item)=> item.name}
                />
                <Button onPress={this._roomInfo} title="Room"></Button>
                <Button onPress={this._logOut} title="Logout"/>
            </SafeAreaView>          
        )
    }
}