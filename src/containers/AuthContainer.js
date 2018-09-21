import React from 'react';
import {connect} from 'react-redux'
import {onAuthentication} from '../actions/UserAction'
import {onLanguageChange} from '../actions/AppAction'
import Holder from '../components/util/Holder'
import Auth from '../components/auth/Auth'
import Language from '../settings/Language'

class AuthContainer extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  }

  _signin = async (obj)=>{
    console.log(obj)
    console.log('#### isAuth: ', this.props.isAuthenticated)
    await this.props._authentication(obj)
    console.log('#### isAuth:', this.props.isAuthenticated)
    if(this.props.isAuthenticated){
      this.props.navigation.navigate('App');
    }
  }

  render() {
    const language = Language[this.props.language]
    return (
      <Holder>
        <Auth
        language = {language.AuthContainer} 
        onLNchange = { this.props._languageChange }
        LN = {language.is}
        navigate = {(key )=>this.props.navigation.navigate(key) }
        _signin = {this._signin}
        userLoading = {this.props.userLoading}/>
      </Holder>
    );
  }
}

const mapStateToProps = state =>{
  return {
    language: state.AppReducer.language,
    isAuthenticated: state.UserReducer.isAuthenticated,
    userLoading: state.UserReducer.userLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    _languageChange: ()=>{
      dispatch(onLanguageChange())
    },
    _authentication: async (credentials)=>{
      await dispatch(await onAuthentication(credentials))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)