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
        title : '메인 화면'
    }

    state ={
        users :[],
        Myinfo : []
    }

    componentWillMount(){
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val)=>{
            let person = val.val();
            person.phone = val.key;
            if(person.phone == User.phone){
                User.name = person.name,
                this.setState({
                    Myinfo : [person]
                });
            }else{
            this.setState((prevState) => {
                return{
                    users : [...prevState.users, person]
                }
            })
        }
        })
    }

    //Home profile name about friend
    friendRow = ({item}) =>{
        return(
            <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('FriendProfile', item)} 
                style={{padding:10, borderBottomColor:'#ccc', borderBottomWidth:1 }}>
                <Text style ={{fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    //Home Profile name about me >> bold and other style 
    myProfileRow = ({item}) =>{
        return(
            <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('MyProfile', item)} 
                style={{padding:10, borderBottomColor:'#ccc', borderBottomWidth:1 }}>
                <Text style ={{fontSize:30}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    
    render(){
        return(
            <SafeAreaView>
                <FlatList
                    data = {this.state.Myinfo}
                    renderItem = {this.myProfileRow}
                    keyExtractor = {(item)=>item.name}
                />
                
                <FlatList
                    data = {this.state.users}
                    renderItem = {this.friendRow}
                    keyExtractor ={(item)=> item.name}
                />
            </SafeAreaView>          
        )
    }
}