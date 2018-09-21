import React from 'react'
import {connect} from 'react-redux'
import {onAppointmentGet, onAppointmenDelete} from '../actions/AppoinmentAction'
import Saved from '../components/appointment_free/Saved'
import Axios from 'axios'
import {HOST} from '../settings'
import Language from '../settings/Language'
import {getToken} from '../util/Functions'


class SavedContainer extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('header_title', 'Записи'),
        };
    };
    constructor(props){
        super(props)
        const language = Language[this.props.language].SavedContainer
        this.props.navigation.setParams({header_title: language.title})

        this.state = {
            result: {
                isExist: false,
                isSuccess: false,
                message:'test'
            },
            isLoading: false,
        }
        this.props._appointmentGet()
    }
    _requestDelete = async(id)=>{
        this.setState({isLoading: true})
        const TOKEN = await getToken(this.props.appointments[id].HOST_DYNAMIC)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": this.props.appointments[id].HOST_DYNAMIC + "/spring-ds/mobile/cancelVisitToDoctor",
            "method": "POST",
            "headers": {
              "Authorization": TOKEN,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            "processData": false,
            "data": this.props.appointments[id].pure
        }
        Axios(settings)
        .then(res => {
            console.log("$$$RES_APPOI_DELETE", res.data)
            this.setState({
                isLoading: false,
                result: { isExist: true, isSuccess: true,  message:'test' },
            })
            this.props._appointmenDelete(id)
        })
        .catch(err => {
            console.log("$$$ERR_APPOI_DELETE", err)
            this.setState({
                isLoading: false,
                result: { isExist: true, isSuccess: false, message:'test'},
            })
        })
    }
    render(){
        const language = Language[this.props.language].SavedContainer
        return(
            <Saved
            onRequestDelete = {this._requestDelete}
            state = {this.state}
            language = {language}
            LN = { Language[this.props.language].is}
            appointments = {this.props.appointments}/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        _appointmentGet : ()=>{
            dispatch(onAppointmentGet())
        },
        _appointmenDelete : (id)=>{
            dispatch(onAppointmenDelete(id))
        }
    }
}

const mapStateToProps = state => {
    return {
        appointments: state.AppointmentReducer.appointments,
        token: state.AppReducer.token,
        language: state.AppReducer.language,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedContainer)