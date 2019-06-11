import React from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  FlatList 
} from 'react-native';
import styles from '../design/styles';
import User from '../User';
import Voice from 'react-native-voice';
import firebase from 'firebase';

export default class VoiceChat extends React.Component {

    static navigationOptions = ({navigation}) => {
        return{
            title : navigation.getParam('roomName', null),
            //tabBarVisible : navigation.setParam(,
        } 
    }
    
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      person:{
            name : props.navigation.getParam('name'),
            phone: props.navigation.getParam('phone'),
      },
      textMessage : '',
      messageList : [],
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }
async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  }

state = {
    textMessage : '',
}

componentWillMount(){
  firebase.database().ref('messages').child(this.props.navigation.getParam('roomKeyId'))
  .on('child_added', (value) =>{
    this.setState((prevState)=>{
      return{
        messageList : [...prevState.messageList, value.val()]
      }
    })
  })
}

handleChange = key => val => {
    Voice.stop();
    this.setState({ [key] : val })
}

convertTime = (time) => {
  let d = new Date(time);
  let c = new Date();
  let result = (d.getHours()< 12 ? '오전 ' : '오후 ') + d.getHours() + ':' +(d.getMinutes()< 10 ? '0'+d.getMinutes() : d.getMinutes());
  if(c.getDay() !== d.getDay()){
      result = d.getDay() + ' ' + d.getMonth() + ' ' +'\n' +result;
  }
  return result;
}

sendMessage = async() => {
    
    await Voice.destroy();
    this.textInput.clear();
    let roomId = this.props.navigation.getParam('roomKeyId',null);
    if(this.state.textMessage.length > 0){
       let msgId = firebase.database().ref('messages').child(roomId).push().key;
        let updates = {};
        let message = {
            message : this.state.textMessage,
            time : firebase.database.ServerValue.TIMESTAMP,
            writer : User.phone, 
        }
       
        updates['messages/'+roomId+'/'+ msgId] = message;
        firebase.database().ref().update(updates);
    }else{
      
      let msgId = firebase.database().ref('messages').child(roomId).push().key;
      let updates = {};
      let message = {
          message : this.state.results[0],
          time : firebase.database.ServerValue.TIMESTAMP,
          writer : User.phone,    
      }
      updates['messages/'+roomId+'/'+ msgId] = message;
      firebase.database().ref().update(updates);
    }
    this.setState({results : []});
    this.setState({textMessage : ''});
}

renderRow = ({item}) =>{
  return(
    <View style = {{flexDirection :'row', 
            width : '50%', 
            alignSelf : item.writer==User.phone ? 'flex-end' : 'flex-start',
            backgroundColor : item.writer==User.phone ? '#00897b' : '#7cb342',
            borderRadius :5 ,
            marginBottom : 10,
            marginRight : 10,
            marginLeft : 10,
            flexWrap: 'wrap',
            flexDirection : 'column'
    }}>
        <Text style={{flex:2, color:'#fff', padding:7, fontSize:16}}>
          {item.message}
        </Text>
        <Text style={{flex:1, color :'#eee', padding:7, fontSize: 10}}>
          {this.convertTime(item.time)}
        </Text>

  </View>
  )
}

render () {
    let {height, width} = Dimensions.get('window');
    return (
    <KeyboardAvoidingView style={styles.container} enabled>
      <SafeAreaView>
          <FlatList
            style ={{padding:10, height : height*0.7}}
            data ={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(item,index) => index.toString()}
            ref={ref => this.flatList = ref}
            onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
            onLayout={() => this.flatList.scrollToEnd({animated: true})}
          />
          <Button style={styles.transcript}
          onPress={this._startRecognition.bind(this)}
          title="녹음"></Button>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TextInput
                ref={input => { this.textInput = input }}
                clearButtonMode="always"
                style = {styles.input}     
                placeholder="Type message..."
                onChangeText={this.handleChange('textMessage')}
            >
              <Text>{this.state.results[0]}</Text>
            </TextInput>
            <Button  onPress={this.sendMessage} title ="Send" style={{marginLeft : 5 , marginRight: 5, flex: 1}}>
            </Button >
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
