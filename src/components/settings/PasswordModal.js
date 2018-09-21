import React from 'react'
import {
    View, 
    Modal, 
    StyleSheet, 
    Text, 
    ScrollView,  
    Dimensions,
    LayoutAnimation,
    UIManager,
} from 'react-native'
import {DEVICE_HEIGHT, DEVICE_WIDTH, BORDER_COLOR, RESULT} from '../../settings'
import {Button, FormInput, FormValidationMessage, Icon} from 'react-native-elements'


import {MAIN_COLOR} from '../../settings'

const SCREEN_WIDTH = Dimensions.get('window').width;

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PasswordModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            passwordOld: '123123123',
            password: '123123123', 
            passwordConfirm: '123123123',
            isPasswordOldValid: true,
            isPasswordConfirmValid: true,
            isPasswordValid: true,
        };
    }

    _change = ()=> {
        const { password, passwordConfirm, passwordOld } = this.state;
        let obj = {
          isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
          isPasswordConfirmValid: password == passwordConfirm || this.passwordConfirmInput.shake(),
          isPasswordOldValid: password.length >= 8 || this.passwordOldInput.shake(),
        }
        this.setState(obj);
        
        if(obj.isPasswordOldValid && obj.isPasswordOldValid && obj.isPasswordValid){
            this.props.onPasswordChange(this.state)
        }
    }

    _close = ()=>{
        this.setState({
            passwordOld: '123123123',
            password: '123123123', 
            passwordConfirm: '123123123',
            isPasswordOldValid: true,
            isPasswordConfirmValid: true,
            isPasswordValid: true,
        })
        this.props.onRequestClose()
    }

    render(){
        const {
            password, passwordConfirm, passwordOld,
            isPasswordConfirmValid, isPasswordOldValid,isPasswordValid
        } = this.state;
        const {isLoading, result} = this.props

        console.log(this.props, this.state)
        let errorMes = result.isExist && !result.isSuccess ? <FormValidationMessage> { result.message }</FormValidationMessage> :null
        let successMes =result.isExist && result.isSuccess ? <Text style={{color: 'green', fontSize: 15}}>{"Изменен!!"}</Text>: null
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                keyboardShouldPersistTaps={true}
                onRequestClose={ this._close }>
                <View style={styles.container}>
                    <View style={styles.inner_container}>

                        <Text style={styles.title}>Change Password</Text>

                        <FormInput 
                        placeholderTextColor = {MAIN_COLOR}
                        borderBottomColor = {MAIN_COLOR}
                        value={passwordOld}
                        keyboardAppearance='light'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType={'next'}
                        blurOnSubmit={true}
                        containerStyle={styles.inputCont}
                        inputStyle={{marginLeft: 20}}
                        placeholder={'Старый Пароль'}
                        ref={input => this.passwordOldInput = input}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={(passwordOld) => this.setState({passwordOld})}/>
                        <FormValidationMessage containerStyle={{marginBottom:10}}>
                            { isPasswordOldValid || 'минимум 8 символов'}
                        </FormValidationMessage>
                
                        <FormInput 
                            placeholderTextColor = {MAIN_COLOR}
                            borderBottomColor = {MAIN_COLOR}
                            value={password}
                            keyboardAppearance='light'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            returnKeyType={'next'}
                            blurOnSubmit={true}
                            containerStyle={styles.inputCont}
                            inputStyle={{marginLeft: 20}}
                            placeholder={'Новый Пароль'}
                            ref={input => this.passwordInput = input}
                            onSubmitEditing={() => this.passwordConfirmInput.focus()}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <FormValidationMessage containerStyle={{marginBottom:10}}>
                            { isPasswordValid || 'минимум 8 символов'}
                        </FormValidationMessage>

                        <FormInput 
                            placeholderTextColor = {MAIN_COLOR}
                            borderBottomColor = {MAIN_COLOR}
                            value={passwordConfirm}
                            keyboardAppearance='light'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            returnKeyType={'done'}
                            blurOnSubmit={true}
                            containerStyle={styles.inputCont}
                            inputStyle={{marginLeft: 20}}
                            placeholder={'Повтoрите Пароль'}
                            ref={input => this.passwordConfirmInput = input}
                            onSubmitEditing={this._change}
                            onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
                        />
                        <FormValidationMessage containerStyle={{marginBottom:10}}>
                            { isPasswordValid || 'пароль не совпадает'}
                        </FormValidationMessage>

                        <Button
                        buttonStyle={styles.loginButton}
                        containerStyle={{marginTop: 32, flex: 0}}
                        activeOpacity={0.8}
                        title={'CHANGE'}
                        onPress={this._change}
                        titleStyle={styles.loginTextButton}
                        loading={isLoading}
                        disabled={isLoading} 
                        />        
                        {/* {errorMes} {successMes} */}
                        {errorMes}
                        {successMes}


                    </View>
                    <Button  
                    large
                    fontSize = {20}
                    backgroundColor = 'white'
                    borderRadius = {10}
                    color = '#3676DF'
                    title = 'Exit'
                    onPress = { this._close }
                    containerViewStyle = {styles.btn_container}
                    disabled = {isLoading}
                    loading = {isLoading}
                    />
                </View>
            </Modal>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.75)',
        justifyContent: 'center',
        alignItems:'center',
    },
    inner_container:{
        width: DEVICE_WIDTH - 40,
        height: DEVICE_HEIGHT * 0.7,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        paddingTop: 10,
    },
    btn_container:{
        marginTop: 10,
        width: DEVICE_WIDTH - 40,
    },
    result_container:{
        marginTop: 10,
        width: DEVICE_WIDTH - 40,
        justifyContent:'center',
        alignItems: 'center'
    },
    menu_item_text:{
        color: BORDER_COLOR
    },

    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        alignItems:'center',
        paddingTop: 20,
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
        width: SCREEN_WIDTH - 50,
    },
    title:{
        fontSize: 30,
        color: MAIN_COLOR,
    }
})
