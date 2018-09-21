import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { FormInput, FormValidationMessage, Button, CheckBox,  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {REGISTRATION_ELEMENTS, DEVICE_WIDTH, MAIN_COLOR} from '../../settings'

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class SignupForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      name: '',
      iin:'',
      db:'"1998-10-30"',
      nomer:'',
      isMale: true,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      isNameValid:true,
      isIinValid:true,
      isNomerValid:true,
      isDbValid: true,
    };
  }


  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _registr = ()=> {
    const {
      email,
      password,
      passwordConfirmation,
      name,
      iin,
      nomer,
    } = this.state;
    let obj = {
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
      isConfirmationValid: password == passwordConfirmation || this.confirmationInput.shake(),
      isNomerValid: nomer.length == 11 || this.nomerInput.shake(),
      isIinValid: iin.length == 12 || this.iinInput.shake(),
      isNameValid: name.split(' ').length == 3 || this.nameInput.shake()
  }
    this.setState(obj);
    if(obj.isEmailValid && obj.isPasswordValid && obj.isConfirmationValid && obj.isNomerValid && obj.isIinValid && obj.isNameValid){
        this.props.onLoading(true)
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.props.onLoading(false)
        }, 1500);
    }
  }

  render() {
    let language = this.props.language
    let OUTPUT = []
    REGISTRATION_ELEMENTS.map((value, id)=>{
      let isEnd = REGISTRATION_ELEMENTS.length == id+1
      let next = null
      if(!isEnd){
        next = REGISTRATION_ELEMENTS[id + 1].input
      }
      OUTPUT.push(
        <View key = {value.name}>
        <FormInput 
          leftIcon={
            <Icon
              name='envelope-o'
              color= {MAIN_COLOR}
              size={25}
              style={{backgroundColor: 'transparent'}}
            />
          }
          onFocus = {()=>{ this.props.setOffset( value.offset ) }}
          placeholderTextColor = {MAIN_COLOR}
          value={this.state[value.name]}
          keyboardAppearance='light'
          autoFocus={false}
          returnKeyType={isEnd ?'done':'next'}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType={ value.keybord }
          returnKeyType='next'
          secureTextEntry={value.isPassword}
          inputStyle={{marginLeft: 20}}
          placeholder={value.placeholder}
          containerStyle={styles.inputCont}
          ref={input => this[value.input] = input}
          onSubmitEditing={() => isEnd ? null : this[next].focus() }
          onChangeText={text => { 
            let obj = {}
            obj[value.name] = text
            this.setState(obj)
          }}
        />
        <FormValidationMessage>{ this.state[value.valid] || value.error }</FormValidationMessage>  
      </View>
      )  
    })

    return (
        <View style={styles.formContainer}>
            { OUTPUT }

            <View style = {styles.datePicker}>
            <CheckBox
                title='M'
                checked={this.state.isMale}
                onPress={() => this.setState({isMale: true})}
            />
            <CheckBox
                title='Ж'
                checked={!this.state.isMale}
                onPress={() => this.setState({isMale: false})}
            />
            </View>
            <Button
              buttonStyle={styles.loginButton}
              containerStyle={{marginTop: 32, flex: 0}}
              activeOpacity={0.8}
              title={language.signup}
              onPress={this._registr}
              titleStyle={styles.loginTextButton}
              loading={this.props.isLoading}
              disabled={this.props.isLoading}
            />
        </View> 
    );
  }
}


const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    width: DEVICE_WIDTH - 30,
    alignItems:'center',
  },
  loginButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

  db:{
      color: 'rgba(0,0,0,0.40)',
      fontSize: 15,
      paddingLeft: 10,
  },
  inputCont:{
    borderBottomColor: MAIN_COLOR,
    marginLeft: -10,
    padding: 5,
    width: DEVICE_WIDTH - 100 ,
  }
});