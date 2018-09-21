import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  ScrollView,
  Button as NativeButton
} from 'react-native';
import { Button } from 'react-native-elements'
import SigninForm from './SigninForm'
import SignupForm from './SignupForm'
import IosBottomModal from '../util/IosBottomModal'
import { MAIN_COLOR } from '../../settings';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/signin2.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);


const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected}/>
    </View>
  );
};

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: 0,
      isLoading: false,
      keyOffset: 0,
      isModalBottom: false,
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  selectCategory(selectedCategory) {
    if(!this.state.isLoading){
      LayoutAnimation.easeInEaseOut();
      this.setState({
        selectedCategory,
        isLoading: false,
      });
    }
  }

  _setOffset = (value)=>{
    this.setState({keyOffset: value})
  }

  render() {
    const language = this.props.language
    const {  selectedCategory, isLoading  } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    const OUTPUT = isLoginPage 
      ? <SigninForm 
          signin = {(obj) => this.props._signin(obj)} 
          isLoading={this.props.userLoading}
          setOffset = {this._setOffset}
          language ={language}/> 
      : <View style={{padding:10,alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize: 16, fontFamily: 'italic'}}>{language.tempUpdate}</Text>
      </View>
      // : <SignupForm 
      //     onLoading={this._loading} 
      //     isLoading={this.state.isLoading}
      //     setOffset = {this._setOffset}
      //     language ={language}/>
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}>
            <ScrollView >
              <View style={styles.inner_container}>
              <KeyboardAvoidingView 
              keyboardVerticalOffset={this.state.keyOffset} 
              contentContainerStyle={styles.loginContainer} 
              behavior='position'>
                <View style={styles.language}>
                    <NativeButton
                    title={this.props.LN}
                    color = {MAIN_COLOR}
                    onPress={ this.props.onLNchange }
                    />
                </View>
                <View style={styles.titleContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.titleText, {fontFamily: 'georgia', paddingRight: 10}]}>ELSI</Text>
                  </View>
                  <View style={{marginTop: -15, marginLeft: 35}}>
                    <Text style={[styles.titleText, {fontFamily: 'regular', fontSize: 30}]}>MED</Text>
                  </View>
                </View>
                  <View style={{flexDirection: 'row'}}>
                    <Button
                      clear
                      activeOpacity={0.7}
                      onPress={() => this.selectCategory(0)}
                      buttonStyle={styles.btnCategoryText}
                      textStyle={[styles.categoryText, isLoginPage && styles.selectedCategoryText]}
                      title={language.signin}
                    />
                    <Button
                      clear
                      activeOpacity={0.7}
                      onPress={() => this.selectCategory(1)}
                      buttonStyle={styles.btnCategoryText}
                      textStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
                      title={language.signup}
                    />
                  </View>  

                  <View style={styles.rowSelector}>
                    <TabSelector selected={isLoginPage}/>
                    <TabSelector selected={isSignUpPage}/>
                  </View>              
                  <View style={styles.formContainer}>
                    {OUTPUT}
                  </View>                  
                </KeyboardAvoidingView>
                <View style={styles.helpContainer}>
                  <Button
                    title={language.appointment_request}
                    titleStyle={{color: 'white', fontSize: 35, fontFamily: 'regular'}}
                    buttonStyle={styles.bottomBtn}
                    onPress={()=> this.setState({isModalBottom: true}) }
                  />
                </View>
                <View style={[styles.titleContainer,{alignItems: 'center'}]}>
                  <Text style={styles.info}>{language.copyright}</Text>
                </View>
              </View>
            </ScrollView>
        </ImageBackground>
        <IosBottomModal
        visible = {this.state.isModalBottom}
        onRequestClose = {()=> this.setState({isModalBottom: false})}
        LN = {this.props.LN}
        list = {[
            {
                title:  language.iosBottom.free ,
                key: 'Appointment'
            },
            {
                title:  language.iosBottom.fee ,
                key: 'AppointmentFee'
            },
            {
              title:  language.iosBottom.saved ,
              key: 'Saved'
            },
        ]}
        height = {220}
        onPress = { (key)=>{ 
          this.props.navigate(key) 
          this.setState({isModalBottom: false}) 
        } }/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  loading:{
    fontSize: 20,
    color: 'white'
  },
  container: {
    flex: 1,
  },

  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems:'center',
  },
  
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner_container: {
    flex: 1,
    top: 0,
    left: 0,
    paddingTop: 20,
    width: SCREEN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  selectedCategoryText: {
    opacity: 1,
    color: 'white'
  },
  titleText: {
    color: 'white',
    fontSize: 45,
  },
  helpContainer: {
    marginTop: 10,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  btnCategoryText: {
    backgroundColor: 'transparent',
  },
  info:{
    color: 'rgba(255,255, 255,0.7)',
    fontSize: 15,
  },
  bottomBtn:{
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  },
  language:{
    height: 55,
    padding: 10,
    paddingTop: 20,
    width: SCREEN_WIDTH,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }

});




