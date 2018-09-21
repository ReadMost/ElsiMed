import React from 'react'
import {
  View, StyleSheet, Text, Clipboard  
} from 'react-native'
import {MAIN_BUTTONS_COLOR, BORDER_COLOR,} from '../../settings'
import {
  Button, 
  Icon,
  FormValidationMessage,
  FormInput
} from 'react-native-elements'


export default class Error extends React.Component {
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
    this.setState(obj)
    if(obj.isTextValid){
      this.props._onSend(this.state.text)
    }
  }
  render() {
    const {
      result,
      isLoading
    } = this.props.state
    let resError = result.isExist && !result.isSuccess 
      ? <FormValidationMessage>{ result.message}</FormValidationMessage> : null
    let resSuccess = result.isExist && result.isSuccess 
      ? <Text style= {{color: 'green', fontSize: 14}}>{ result.message}</Text>:null
    return (
      <View style={styles.inner_container}>
            <Text style={styles.info}>Кратко опишите возникшую проблему, и мы благодарны за вашу помощь </Text>
            <Text style={styles.count}>{300 - this.state.text.split('').length} максимальная длинна</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Icon
                name = {'content-copy'}
                color = {'black'}
                size = {17}
                onPress = {()=>{ this.toContentPaste() }}
                raised
                underlayColor = {BORDER_COLOR}
                containerStyle = {{backgroundColor: 'white'}}/>
                <Icon
                name = {'delete'}
                color = {'black'}
                size = {17}
                onPress = {()=>{  this.setState({text: ''}) }}
                raised
                underlayColor = {BORDER_COLOR}
                containerStyle = {{backgroundColor: 'white'}}/>
            </View>
            
            <FormValidationMessage>{this.state.isTextValid || "заполните форму"}</FormValidationMessage>
            { resError}
            { resSuccess }
            <FormInput
                style={styles.input}
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
                placeholder = 'сообщить об ошибке...'
                onSubmitEditing={this._onSend}
                maxLength = {300}
            />
            <Button
            large
            backgroundColor = {MAIN_BUTTONS_COLOR}
            rightIcon={{name: 'add'}}
            borderRadius = {10}
            title='Отправить' 
            onPress = {this._onSend}
            disabled = {isLoading}
            loading = {isLoading}/>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  inner_container:{
      padding: 15,
  },
  input:{
      borderColor: '#A9A9A9', 
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
  },
  count:{
      fontSize: 15,
      color: BORDER_COLOR,
  }
})
