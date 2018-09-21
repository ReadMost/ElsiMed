import React from 'react';
import {connect} from 'react-redux'
import {onLanguageChange} from '../actions/AppAction'
import Holder from '../components/util/Holder'
import {BurgerHeader} from '../components/util/TopHeader'
import Setting from '../components/settings/Setting'
import LANGUAGE from '../settings/Language'

class SettingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingPassword: false,
      resultPassword: {
        isExist: false,
        isSuccess: false,
        message: 'повторите позже'
      }
    }
  }

  _passwordChange = (obj)=>{
    this.setState({isLoadingPassword: true})
    console.log('$$$$$$$$$', obj)
    setTimeout(()=>{
      this.setState({
        isLoadingPassword: false,
        resultPassword: {
          isExist: true,
          isSuccess: true,
          message: 'повторите позже'
        }
      })
    }, 2000)
  }

  _passwordClose = ()=>{
    this.setState({
      isLoadingPassword: false,
      resultPassword: {
        isExist: false,
        isSuccess: false,
        message: 'повторите позже'
      }
    })
  }
  render() {
    const ln = LANGUAGE[this.props.language]
    const language = LANGUAGE[this.props.language].SettingContainer
    return (
      <Holder>
          <BurgerHeader 
          title = {language.title}
          onSideBar={()=>{this.props.navigation.toggleDrawer()}}/>
          <Setting
          state = {this.state}
          onPasswordChange = {this._passwordChange}
          onPasswordClose = {this._passwordClose}
          onLanguageChange = {this.props._languageChange}
          LN = {ln.is}
          language = {language}/>
      </Holder>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.AppReducer.language
  }
}

const mapDispatchToProps = dispatch => {
  return {
    _languageChange: ()=>{
      dispatch(onLanguageChange())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer)