import React from 'react'
import {
  View, 
  StyleSheet, 
  Text, 
  Clipboard,
  LayoutAnimation,
  UIManager, 
} from 'react-native'
import {MAIN_BUTTONS_COLOR, BORDER_COLOR, MAIN_COLOR,} from '../../settings'
import {
  Button, 
  Icon,
  FormValidationMessage,
  FormInput
} from 'react-native-elements'

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class AppointmentForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        text: '', 
        isTextValid: true
    }
  }
  toContentPaste = async () => {
    let clipboardContent = await Clipboard.getString(); 
    if(clipboardContent !== null){
        this.setState({ text: clipboardContent });
    }
  } 
  _onSend = ()=>{
    let obj = {
      isTextValid: this.state.text !== '' || this.textInput.shake()
    }
    LayoutAnimation.easeInEaseOut();
    this.setState(obj)
    if(obj.isTextValid){
      this.props._onSend(this.state.text)
    }
  }
  render() {
    let language = this.props.language
    const {
      result,
      isLoading
    } = this.props.state
    let isSuccess =  result.isExist && result.isSuccess
    let resError = result.isExist && !result.isSuccess
      ? <Text style= {[{backgroundColor: '#FF5863', }, styles.mess]}>{ result.message}</Text>: null
    let resSuccess = result.isExist && result.isSuccess 
      ? <Text style= {[{backgroundColor: '#86D5B2', }, styles.mess]}>{ result.message}</Text>:null

    let {doctorFio, currentDate, time} = this.props.data
    let inverseDate = ''
    currentDate.split('-').map(val=>{ inverseDate = val+ ' - ' +inverseDate })
    return (
      <View style={styles.inner_container}>
            <Text style={styles.info}>{language.info(doctorFio,inverseDate, time )}</Text>
            <Text style={styles.count}>{300 - this.state.text.split('').length}{' ' +language.maxLength}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Icon
                name = {'content-copy'}
                color = {MAIN_COLOR}
                size = {17}
                onPress = {()=>{ this.toContentPaste() }}
                raised
                underlayColor = {BORDER_COLOR}
                containerStyle = {{backgroundColor: 'white'}}/>
                <Icon
                name = {'delete'}
                color = {MAIN_COLOR}
                size = {17}
                onPress = {()=>{  this.setState({text: ''}) }}
                raised
                underlayColor = {BORDER_COLOR}
                containerStyle = {{backgroundColor: 'white'}}/>
            </View>
            
            <FormValidationMessage>{this.state.isTextValid || language.fillForm}</FormValidationMessage>
            { resError}
            { resSuccess }
            <FormInput
                containerStyle={styles.input}
                style = {styles.input}
                onChangeText={(val) => this.setState({text: val})}
                value={this.state.text}
                padding = { 7 }
                fontSize = { 16 }
                autoFocus = {false}
                multiline = {true}
                returnKeyType={'done'}
                blurOnSubmit={true}
                numberOfLines = {4}
                ref = {(input)=> this.textInput = input}
                underlineColorAndroid='transparent'
                placeholder = {language.reason + '...'}
                onSubmitEditing={this._onSend}
                maxLength = {300}
            />
            <Button
            large
            backgroundColor = {MAIN_COLOR}
            textStyle = {{color: 'white'}}
            rightIcon={{name: 'add', color: 'white'}}
            containerViewStyle = {styles.btn_style}
            borderRadius = {10}
            title={language.btn} 
            onPress = {this._onSend}
            disabled = {isLoading || result.isExist}
            loading = {isLoading}/>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  inner_container:{
      padding: 15,
  },
  btn_style:{
    borderColor: MAIN_COLOR,
    borderRadius: 10,
    borderWidth: 1,
  },
  input:{
      borderColor: MAIN_COLOR, 
      borderWidth: 1,
      borderRadius: 5,
      padding: 15,
      maxHeight: 200,
      marginBottom: 30
  },
  info:{
      fontSize: 15,
      color: BORDER_COLOR,
      paddingBottom: 10,
      color: 'black',
      fontFamily: 'regular',
  },
  mess:{
    textAlign:'center',
    fontFamily: 'italic',
    margin: 10,
    fontSize: 17,
    color: 'white',
    padding: 5,
    borderRadius: 10,
  },
  count:{
      fontSize: 15,
      color: BORDER_COLOR,
      fontFamily: 'regular'
  }
})


