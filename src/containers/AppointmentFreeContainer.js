import React from 'react';
import {connect} from 'react-redux'
import {
    LayoutAnimation,
    UIManager,
} from 'react-native'
import {onOpenTokenSet, onLanguageChange} from '../actions/AppAction'
import {onHostsGet} from '../actions/HostsAction'
import Holder from '../components/util/Holder'
import AppointmentFree from '../components/appointment_free/AppointmentFree'
import Axios from 'axios';
import Language from '../settings/Language'
import {HOST} from '../settings'
import {getToken, postFio} from '../util/Functions'


function getHostById(arr, id){
    for(let i = 0; i<arr.length; i++ ){
        if(arr[i].originalID === id){
            return arr[i].apiUrlHttps
        }
    }
    return -1;
}

function getHTTPHostById(arr, id){
    for(let i = 0; i<arr.length; i++ ){
        if(arr[i].originalID === id){
            return arr[i].apiUrlHttp
        }
    }
    return -1;
}



// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

class AppointmentFreeContainer extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('header_title', 'Записаться  врачу'),
        };
    };
  constructor(props) {
    super(props);
    const language = Language[this.props.language].AppointmentFreeContainer
    this.props.navigation.setParams({header_title: language.title})

    this.state = {
        isLoading: false,
        isLoadingConfirmed: false,
        isHTTP: false,
        doctors: [],
        isConfirmed: false,
        fio: '',
        iin: '',
        personId: '',
        hospital: '', 
        user: {},
        ORIGINAL_ID: -1,
        result: {
            isExist: false,
            isSuccess: false,
            message: ''
        },
        resultConfirmed: {
            isExist: false,
            isSuccess: false,
            message: ''
        }
    }
  }

  _clear = ()=>{
      this.setState({
        isLoading: false,
        isLoadingConfirmed: false,
        isConfirmed: false,
        result: {
            isExist: false,
            isSuccess: false,
            message: ''
        },
        resultConfirmed: {
            isExist: false,
            isSuccess: false,
            message: ''
        } 
      })
  }

  _load_fio = async (iin)=>{
        const language = Language[this.props.language].AppointmentFreeContainer
        LayoutAnimation.easeInEaseOut();
        this.setState({
            isLoading: true,
            isConfirmed: false,
            isLoadingConfirmed: true,
            isHTTP: false
        })
        await this.props._openTokenSet()
        console.log('$$$POST_FIO',this.props.host,  this.props.token )

        let response = await postFio(this.props.host, this.props.token, iin, language.doNotExist, language.repeatAgain)
        LayoutAnimation.easeInEaseOut();
        this.setState(response.nextState)
  }

  _confirm = async (SECOND_URL = 'EMPTY') => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            isLoadingConfirmed: true,
        })
            //STEP 1 get TOKEN and get HOSTS
            await this.props._openTokenSet()
            await this.props._hostsGet()
            let TEM_ORIGINAL_ID = this.state.ORIGINAL_ID
            let HOST_DYNAMIC = ''

            console.log('$$$POST_ATTACH_ROOM',this.props.host,  this.props.token )
            if(SECOND_URL === 'EMPTY'){
                /***
                 * STEP 2 get NAME and ORIGINAL_ID of the hospital where patient attached
                 */
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": this.props.host + "/spring-ds/mobile/findPatientAttach",
                    "method": "POST",
                    "headers": {
                    "Authorization": this.props.token,
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    },
                    "processData": false,
                    "data": this.state.personId
                }
                try{
                    let res = await Axios(settings)
                    console.log('$$$RES_FIND_ATTACH', res.data, this.props.token)
                    LayoutAnimation.easeInEaseOut();
                    this.setState({
                        resultConfirmed: {
                            isExist: true,
                            isSuccess: true,
                            message: 'повторите позже',
                        },
                        isHTTP: false,
                        hospital: res.data.name,
                        ORIGINAL_ID: res.data.originalID,
                    })
                    TEM_ORIGINAL_ID = res.data.originalID
                }catch(err){
                    console.log('$$$ERR_FIND_ATTACH', err, this.props.token)
                    LayoutAnimation.easeInEaseOut();
                    this.setState({
                        resultConfirmed: {
                            isExist: true,
                            isSuccess: false,
                            message: 'повторите позже',
                        },
                    }) 
                }

                HOST_DYNAMIC = getHostById(this.props.hosts, TEM_ORIGINAL_ID) 
            }else{
                this.setState({isHTTP: true})
                HOST_DYNAMIC = getHTTPHostById(this.props.hosts, TEM_ORIGINAL_ID) 
            }

            
            /**
             * STEP 3 get ROOMS but it have to authorized
             */
            let ROOM_TOKEN = await getToken(HOST_DYNAMIC)
            let ROOM_URL = HOST_DYNAMIC + '/spring-ds/mobile/findRoom?onlyPatientTerritory=true&iin='+this.state.iin
            try{
                let res = await Axios.get(ROOM_URL,{"headers": {"Authorization": ROOM_TOKEN }})
                console.log('$$$RES_FIND_ROOM', res.data)
                LayoutAnimation.easeInEaseOut();
                this.setState({doctors: res.data})
            }catch(err){
                console.log('$$$ERR_FIND_ROOM', err, ROOM_URL)
                if(SECOND_URL === 'EMPTY'){
                    this.setState({doctors: []})
                    let tem_url = getHTTPHostById(this.props.hosts, TEM_ORIGINAL_ID) 
                    await this._confirm(tem_url)
                }else{
                    this.setState({doctors: []})
                }
                //THERE SHOULD BE HANDLED ERROR
            }


        this.setState({
            isLoadingConfirmed: false,
            isConfirmed: true,
        })

  }

  render() {
    const language = Language[this.props.language]
    let HOST_DYNAMIC = getHostById(this.props.hosts, this.state.ORIGINAL_ID) 
    if(this.state.isHTTP){
        HOST_DYNAMIC = getHTTPHostById(this.props.hosts, this.state.ORIGINAL_ID)  
    }
    return (
      <Holder>
        <AppointmentFree
        language = {language.AppointmentFreeContainer}
        LN = {language.is} 
        state = {this.state}
        _load_fio = {(iin)=>{ this._load_fio(iin) }}
        _confirm = {this._confirm}
        _clear = {this._clear}
        toFee = {(user_iin)=> this.props.navigation.navigate('AppointmentFee', {user_iin})}
        HOST_DYNAMIC = {HOST_DYNAMIC}
        _agendaRequest = {(key)=>{ 
            this.props.navigation.navigate('Agenda', {
                roomId: key, 
                user: { 
                    fio: this.state.fio,
                    iin: this.state.iin
                },
                HOST_DYNAMIC: HOST_DYNAMIC
        })}}/>
      </Holder>
    );
  }
}


const mapDispatchToProps = dispatch => {
    return {
        _openTokenSet: async() => {
            await dispatch(await onOpenTokenSet())
        },
        _hostsGet: async() => {
            await dispatch(await onHostsGet())
        },
        _languageChange: ()=>{
            dispatch(onLanguageChange())
        },
    }
}

const mapStateToProps = state => {
    return {
        token: state.AppReducer.token,
        host: state.AppReducer.host,
        language: state.AppReducer.language,
        hosts: state.HostsReducer.hosts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentFreeContainer)