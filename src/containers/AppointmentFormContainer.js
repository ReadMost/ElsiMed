import React from 'react';
import {connect} from 'react-redux'
import {onAppointmentSet} from '../actions/AppoinmentAction'
import Holder from '../components/util/Holder'
import {BurgerHeader} from '../components/util/TopHeader'
import ApointmentForm from '../components/appointment_free/ApointmentForm'
import Axios from 'axios'
import Language from '../settings/Language'
import {getToken} from '../util/Functions'

class AppointmentFormContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('header_title', 'Записаться  врачу'),
    };
  };
  constructor(props) {
    super(props);
    const language = Language[this.props.language].AppointmentFormContainer
    this.props.navigation.setParams({header_title: language.title})


    this.state = {
      isLoading: false,
      result: {
        isExist: false,
        isSuccess: false,
        message: 'повторите позже'
      },
    }
  }
  /**
   * The method for (1) sending request to server 
   * and then saving to AsyncStorage 
   */
  _onSend = async (text)=>{
    const language = Language[this.props.language].AppointmentFormContainer
    this.setState({isLoading: true})
    let {request,HOST_DYNAMIC } = this.props.navigation.state.params
    const TOKEN = await getToken(HOST_DYNAMIC)
    request.headers.Authorization = TOKEN
    request.data.visitReason = text
      Axios(request)
      .then(res=>{
            console.log("$$$RES_SLOT_APPOINT", res.data)
            this.setState({
              isLoading: false,
              result: { isExist: true, isSuccess: true, message: language.success}
            })
            //saving data to AsyncStorage
            this.props._appointmentSet({
              pure: res.data, 
              data: this.props.navigation.state.params, 
              HOST_DYNAMIC: HOST_DYNAMIC
          })
      }).catch(err=>{
        console.log("$$$ERR_SLOT_APPOINT",err.response.status, request)
        this.setState({ 
          isLoading: false,
          result: {isExist: true,isSuccess: false, message: language.error }
        })
        if(err.response.status === 500){
          this.setState({
            result: {isExist: true,isSuccess: false, message: language.serverError }
          })
        }
        if(err.response.status === 403){
          this.setState({
            result: {isExist: true,isSuccess: false, message: language.limit }
          })
        }
      })
  }

  render() {
    const language = Language[this.props.language].AppointmentFormContainer
    return (
      <Holder>
          <ApointmentForm
          state = {this.state}
          data = {this.props.navigation.state.params}
          language = {language}
          _onSend = {this._onSend}/>
      </Holder>
    );
  }
}
const mapStateToProps = state => {
  return {
      token: state.AppReducer.token,
      language: state.AppReducer.language,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    _appointmentSet: (obj)=>{
      dispatch(onAppointmentSet(obj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentFormContainer)