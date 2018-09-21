import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  UIManager,
  Dimensions,
  LayoutAnimation,
  Text,
  Keyboard,
  ScrollView,
  Picker,
} from 'react-native';
import { FormInput, FormValidationMessage , Button, Icon } from 'react-native-elements'
import DoctorPicker from './DoctorPicker'
import CityPicker from '../util/CityPicker'
import HospitalPicker from './HospitalPicker'
import {MAIN_COLOR, BORDER_COLOR} from '../../settings'

const SCREEN_WIDTH = Dimensions.get('window').width;




// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class AuthScreen extends Component {      
    constructor(props) {
        super(props);
        this.state = {
            iin: '', 
            isIinValid: true,
            cityValue: null,
            isHospitalModal: true,
        }
    }

    _load = ()=>{
        Keyboard.dismiss()
        let {iin, isIinValid} = this.state
        let tem_iin_valid = iin.length > 10  || this.iinInput.shake()
        LayoutAnimation.easeInEaseOut();
        this.setState({
            isIinValid: tem_iin_valid,
        }) 
        if(tem_iin_valid){
            this.props._load_fio(this.state.iin)
        }
    }

    _confirm = ()=>{
        this.props._confirm()
    }

    render() {
        let language = this.props.language
        let {
            result,
            fio,
            isLoading,
            resultConfirmed,
            doctors,
            isLoadingConfirmed,
            hospital,
            isConfirmed,
            user
        } = this.props.state

        let isFound = result.isExist && result.isSuccess
        let isFoundConfirm = resultConfirmed.isExist && resultConfirmed.isSuccess
        let OUTPUT = null
        if(isFound && !isLoading){
            OUTPUT = <View style={styles.appointmentHolder}>
                {/* <Text style = {styles.name}>Убедитесь что ИИН правильный: </Text> */}
                <Text style = {styles.name}>{fio + '\n'}</Text>
            </View>
        }

        let DOCTORS_LIST = null
        let isConfirmShow = resultConfirmed.isExist && resultConfirmed.isSuccess && isConfirmed && !isLoadingConfirmed
        if( isConfirmShow){
            DOCTORS_LIST = <View style={styles.appointmentHolder}>
                <View style={styles.hospitalPicker}>
                    <View style={{flex:3}}>
                        <Text style = {styles.name}>{hospital}</Text>
                    </View>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Icon
                        name = {'edit'}
                        color = {MAIN_COLOR}
                        onPress = {()=> this.setState({isHospitalModal: true})}
                        size = {17}
                        raised
                        underlayColor = {BORDER_COLOR}
                        containerStyle = {{backgroundColor: 'white'}}/>
                    </View>
                    <HospitalPicker
                    hosts = {this.props.hosts}
                    visible = {this.state.isHospitalModal}
                    onValueChange={(itemValue) => {
                        this.setState({isHospitalModal: false})
                        this.props._onHostChange(itemValue)
                    }}
                    _close = {()=>  this.setState({isHospitalModal: false})    }/>
                </View>
                <DoctorPicker
                language = {language}
                onPress = {this.props._agendaRequest}
                doctors = {doctors}/>
            </View>
        }
        
        if( resultConfirmed.isExist && !resultConfirmed.isSuccess && isConfirmed && !isLoadingConfirmed){
            DOCTORS_LIST = <FormValidationMessage>{ resultConfirmed.message }</FormValidationMessage> 
        }
        return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style = {styles.header}>{language.enter_iin}</Text>
                            <Icon
                            name = {'delete'}
                            color = {MAIN_COLOR}
                            size = {17}
                            onPress = {()=>{  
                                this.setState({iin: ''})
                                this.props._clear()
                            }}
                            raised
                            underlayColor = {BORDER_COLOR}
                            containerStyle = {{backgroundColor: 'white'}}/>
                        </View>
                        <FormInput 
                            placeholderTextColor = {'black'}
                            value={this.state.iin}
                            keyboardAppearance='light'
                            autoFocus={false}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='numeric'
                            returnKeyType='done'
                            inputStyle={{marginLeft: 20, fontSize: 22}}
                            style={{fontSize: 80}}
                            placeholder={language.enter_iin + '...'}
                            containerStyle={styles.inputCont}
                            ref={input => this['iinInput'] = input}
                            onSubmitEditing={ this._load }
                            onChangeText={iin => this.setState({ iin })}
                        />
                        <FormValidationMessage>{ this.state.isIinValid || language.formatIncorrect}</FormValidationMessage> 
                    </View>
                    <Button
                        title = {language.btn_search}
                        backgroundColor = {MAIN_COLOR}
                        borderRadius = {10}
                        large
                        color = {'white'}
                        onPress = {this._load}
                        buttonStyle = {styles.btn}
                        loading = {isLoading}
                        disabled = {isLoading}
                    />

                    <FormValidationMessage>
                    { ( result.isExist && !result.isSuccess ) ? result.message : null}
                    </FormValidationMessage> 
                    {OUTPUT}
                    {
                        (isFound && !isLoading) ?
                            <Button
                            title = {language.btn_confirm}
                            backgroundColor = {MAIN_COLOR}
                            borderRadius = {10}
                            large
                            color = {'white'}
                            onPress = {this._confirm}
                            buttonStyle = {styles.btn}
                            loading = {isLoadingConfirmed}
                            disabled = {isLoadingConfirmed}
                            />
                        :null
                    }
                    {
                        DOCTORS_LIST
                    }

                </View>
            </ScrollView>
        </View>
        );
    }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    marginBottom: 10,
    marginTop: 10,
  },
  inputCont:{
    borderBottomColor: MAIN_COLOR,
    width: SCREEN_WIDTH - 100,
  },
  btn:{
      width: SCREEN_WIDTH - 30,
  },
  name: {
      fontSize: 18,
      paddingTop: 10,
      paddingBottom: 10,
      color: 'black',
      fontFamily: 'italic',
  },
  appointmentHolder:{
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
  },
  header:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
 },
 hospitalPicker:{
    flexDirection: 'row',
 }

});


