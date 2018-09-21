import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { FormInput, FormValidationMessage , Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {MAIN_COLOR} from '../../settings'

const SCREEN_WIDTH = Dimensions.get('window').width;

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class SigninForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isEmailValid: true,
      isPasswordValid: true,
    };

    this.login = this.login.bind(this);
  }

  componentDidMount(){
    this.props.setOffset(0)
  }


  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  login() {
    const {
      email,
      password,
      isEmailValid,
      isPasswordValid
    } = this.state;
    let obj = {
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
    }
    this.setState(obj);
    
    if(obj.isEmailValid && obj.isPasswordValid){
        LayoutAnimation.easeInEaseOut();
        this.emailInput.shake()
        this.passwordInput.shake()
        // this.props.signin({email, password})
    }
  }

  render() {
    const {
      isEmailValid,
      isPasswordValid,
      email,
      password,
    } = this.state;
    let language = this.props.language
    return (
        <View style={styles.formContainer}>
          <FormInput 
            leftIcon={
              <Icon
                name='envelope-o'
                color= {MAIN_COLOR}
                size={25}
                style={{backgroundColor: 'transparent'}}
              />
            }
            placeholderTextColor = {MAIN_COLOR}
            value={email}
            keyboardAppearance='light'
            autoFocus={false}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType='next'
            inputStyle={{marginLeft: 20}}
            placeholder={language.email}
            containerStyle={styles.inputCont}
            ref={input => this['emailInput'] = input}
            onSubmitEditing={() => this['passwordInput'].focus()}
            onChangeText={email => this.setState({ email })}
          />
          <FormValidationMessage>{ isEmailValid || language.emailError}</FormValidationMessage>  
          
            <FormInput 
            leftIcon={
              <SimpleIcon
                name='lock'
                color= {MAIN_COLOR}
                size={25}
                style={{backgroundColor: 'transparent'}}
              />
            }
            placeholderTextColor = {MAIN_COLOR}
            borderBottomColor = {MAIN_COLOR}
            value={password}
            keyboardAppearance='light'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            returnKeyType={'done'}
            blurOnSubmit={true}
            containerStyle={styles.inputCont}
            inputStyle={{marginLeft: 20}}
            placeholder={language.password}
            ref={input => this.passwordInput = input}
            onSubmitEditing={this.login}
            onChangeText={(password) => this.setState({password})}
          />
          <FormValidationMessage containerStyle={{marginBottom:10}}>
            { isPasswordValid || language.min8}
          </FormValidationMessage>

            <Button
              buttonStyle={styles.loginButton}
              containerStyle={{marginTop: 32, flex: 0}}
              activeOpacity={0.8}
              title={language.signin}
              onPress={this.login}
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
    width: SCREEN_WIDTH - 30,
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
  inputCont:{
    borderBottomColor: MAIN_COLOR,
    marginLeft: -10,
    padding: 5,
    width: SCREEN_WIDTH - 100,
  }
});