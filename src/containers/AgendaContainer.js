import React from 'react'
import {
    LayoutAnimation,
    UIManager,
} from 'react-native'
import Axios from 'axios'
import {connect} from 'react-redux'
import {onOpenTokenSet} from '../actions/AppAction'
import Calendar from '../components/agenda/calendar/Calendar'
import Holder from '../components/util/Holder'
import Agenda from  '../components/agenda/Agenda'
import IosBottomModal from '../components/util/IosBottomModal'
import {BackHeader} from '../components/util/TopHeader'
import Language from '../settings/Language'
import {HOST} from '../settings'
import moment from 'moment';
import {getToken} from '../util/Functions'
import DoctorModalPicker from '../components/agenda/DoctorModalPicker'

const AUTH_TOKEN = (TOKEN) => {
    return {"headers": {"Authorization": TOKEN }}
}





// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

function pure(str){
    str = str.toString()
    if(str.length == 1){
        return '0'+str
    }
    return str
}

function initial_agendas_builder(agendas, user){
    let result = []
    for(let i = 0; i<agendas.length; i++){
        let result_item = {
            doctorFio: agendas[i].doctorFullName,
            workScheduleId: agendas[i].workScheduleId,
            doctorId: i,
            slots: []
        }
        for(let j = 0; j<agendas[i].slots.length; j++){
            let tem = agendas[i].slots[j]
            time = pure(tem.from[0]) + ":" + pure(tem.from[1]) ;
            // + ' - ' + pure(tem.to[0]) + ':'+ pure(tem.to[1])
            available = tem.doctorVisitId === null ? true:false
            result_item.slots.push({
                time,
                pure: {
                    from: tem.from,
                    to: tem.to,
                    room: tem.room,
                    patientFullName:user.fio,
                    patientIin:user.iin,
                    doctorVisitId: null,
                    cancellationReason: "Заболевание",
                    visitReason: 'SHOULD BE SETTED FROM FORM'
                },
                available,
                id: j,
                isLoading: false,
                result:{
                    isExist: false,
                    isSuccess: false,
                    message: 'повторите позже'
                } 
            })

        }
        result.push(result_item)
    }
    return result
}


class AgendaScreen extends React.Component{
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props)
        this.state = {
            isDoctorPicker: false,
            roomId: 6,
            agendas: [],
            HOST_DYNAMIC: '',
            dateMoment: moment(),
            currentDate: '',
            user: {},
            agenda: {
                doctorFio: '',
                doctorId: 0,
                workScheduleId: 57,
                slots: []  
            },
            //the is agenda result does we have agenda for given date
            agendasResult: {
                isExist: false,
                isSuccess: false,
                message: 'успешно записан'
            },
            isLoading: false,
            elementId: -1,
            modalBottom: {
                isModalBottom:false,
                title: ''
            }
        }
    }
    componentDidMount(){
        //this.agendasBuilder()
        this.setState({
            roomId: this.props.navigation.state.params.roomId,
            user: this.props.navigation.state.params.user,
            HOST_DYNAMIC: this.props.navigation.state.params.HOST_DYNAMIC
        })
        //this.onSelectDate(moment())
    }

    didBlurSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            this.onSelectDate(this.state.dateMoment, this.state.agenda.doctorId)
        }
    );

    /**
     * This is method will call any time when date is touched
     * OR first open of container
     */
    onSelectDate = async (date: Moment, agendaId = 0) => {
        const language = Language[this.props.language].AgendaContainer
        this.setState({
            isLoading: true,
            dateMoment: date
        })
        // STEP 1 we clear date and set it as currentDate
        let x = date.format()
        let clearDate = x.substr(0, x.indexOf('T'))
        this.setState({currentDate: clearDate})


        //STEP 2 preperation to get new agenda for selected new date
        const TOKEN = await getToken(this.state.HOST_DYNAMIC)
        const HOST_SLOT = this.state.HOST_DYNAMIC + "/spring-ds/mobile/findDoctorVisitSlots"
        const URL = HOST_SLOT + "?roomId="+this.state.roomId+"&date="+clearDate;
        Axios.get( URL , AUTH_TOKEN(TOKEN))
        .then(res=>{
            console.log("$$$RES_SLOT", res.data.length)
            if(res.data !== "" && res.data[0] !== undefined){
                let new_agendas  = initial_agendas_builder(res.data, this.state.user)
                this.setState({
                    agendas: new_agendas, 
                    agenda: new_agendas[agendaId],
                    agendasResult: { isExist: true, isSuccess: true,message: 'успешно'}
                })
            }else{
                this.setState({
                    agendas: [],
                    agenda: { doctorFio: '', doctorId: 1998,  workScheduleId: 57, slots: []},
                    agendasResult: { isExist: true, isSuccess: false, message: language.noTable}
                })
            }
            this.setState({isLoading: false})
        })
        .catch(err=>{
            console.log("$$$ERR_SLOT",err)
            this.setState({
                isLoading: false,
                agendas: [],
                agenda: { doctorFio: '', doctorId: 1998,  workScheduleId: 57, slots: []},
                agendasResult: {isExist: true, isSuccess: false, message: 'повторите позже'}
            })
        })


    };

    /**
     * STEP 3 this will called when user appointed to one time
     * and navigated to AppointmentForm
     */
    _registe = ()=>{
        LayoutAnimation.easeInEaseOut();
        this.setState({ modalBottom: {isModalBottom: false, title: ''} }) 


        //HERE all axios data prepared for further use in AppointmentForm
        const HOST_APPOINT = this.state.HOST_DYNAMIC + "/spring-ds/mobile/assignVisitToDoctor"
        const {workScheduleId, slots } = this.state.agenda
        const URL = HOST_APPOINT + "?workScheduleId="+workScheduleId+"&date="+this.state.currentDate
        let PURE = slots[this.state.elementId].pure

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL,
            "method": "POST",
            "headers": {
              "Authorization": 'WAITED FOR NEW TOKEN IN FORM CONTAINER',
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            "data": PURE
        }
        console.log("$$$URL_FOR_NAVIGATE", URL, settings )

        this.props.navigation.navigate('AppointmentForm', {
            request: settings, 
            doctorFio: this.state.agenda.doctorFio,
            currentDate: this.state.currentDate,
            time: this.state.agenda.slots[this.state.elementId].time,
            HOST_DYNAMIC: this.state.HOST_DYNAMIC
        })
    }

    _registe_confirm = (id)=>{
        this.setState({
                modalBottom: {
                    isModalBottom: true, 
                    title: Language[this.props.language].AgendaContainer.iosConfirm.title + ' '
                         + this.state.agenda.slots[id].time
                },
                elementId: id,
        })
    }

    _change_doctor = (id)=>{
        this.setState({
            agenda: this.state.agendas[id]
        })
    }

    render(){
        let doctorModalList = []
        this.state.agendas.map(val=>{
            doctorModalList.push({
                title: val.doctorFio,
                key: val.doctorId
            })
        })
        const language = Language[this.props.language].AgendaContainer
        return(
            <Holder>
                <DoctorModalPicker
                doctors = {doctorModalList}
                visible = {this.state.isDoctorPicker}
                onValueChange={(id) => {
                    this.setState({isDoctorPicker: false})
                    this._change_doctor(id)
                }}
                _close = {()=>  this.setState({isDoctorPicker: false})    }
                />
                <IosBottomModal
                visible = {this.state.modalBottom.isModalBottom}
                onRequestClose = {()=> this.setState({modalBottom: {isModalBottom: false, title: ''}})}
                title = { this.state.modalBottom.title }
                list = {[  { title: language.iosConfirm.action,  key: 'OK' }]}
                height = {180}
                LN = {Language[this.props.language].is}
                onPress = { this._registe }/>
                <BackHeader 
                title = {language.title}
                onSideBar={()=>{ this.props.navigation.goBack() }}/>
                <Calendar 
                showDaysAfterCurrent={10}  
                showDaysBeforeCurrent = {0} 
                LN = {Language[this.props.language].is}
                onSelectDate={this.onSelectDate} />
                <Agenda 
                onElementPress={this._registe_confirm} 
                isLoading = {this.state.isLoading} 
                agenda = {this.state.agenda}
                agendasResult = {this.state.agendasResult}
                onDoctorChange = {()=> this.setState({isDoctorPicker: true}) }/>
            </Holder>
        )
    }
}

const mapStateToProps = state =>{
    return {
        token: state.AppReducer.token,
        language: state.AppReducer.language,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        _openTokenSet: async() => {
            await dispatch(await onOpenTokenSet())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaScreen)