import React from 'react';
import {connect} from 'react-redux'
import {
    LayoutAnimation,
    UIManager,
} from 'react-native'
import {onOpenTokenSet, onLanguageChange} from '../actions/AppAction'
import {onHostsGet} from '../actions/HostsAction'
import Holder from '../components/util/Holder'
import AppointmentFee from '../components/appointment_free/AppointmentFee'
import Axios from 'axios';
import Language from '../settings/Language'
import {HOST} from '../settings'
import {getToken, postFio} from '../util/Functions'

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

class AppointmentFeeContainer extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('header_title', 'Записаться  врачу'),
        };
    };
  constructor(props) {
    super(props);
    const language = Language[this.props.language].AppointmentFreeContainer
    this.props.navigation.setParams({header_title: language.title2})   

    this.state = {
        isLoading: false,
        isLoadingConfirmed: false,
        activeHost: 'EMPTY',
        doctors: [],
        isConfirmed: false,
        fio: '',
        iin: '',
        personId: '',
        hospital: '', 
        user: {},
        result: {isExist: false, isSuccess: false,message: '' },
        resultConfirmed: { isExist: false,isSuccess: false,  message: ''}
    }
  }

  async componentDidMount(){
    let USER_IIN = this.props.navigation.getParam('user_iin', 'EMPTY')
    if( USER_IIN !== 'EMPTY'){
        console.log('########', USER_IIN)
        await this._load_fio(USER_IIN)
        await this._confirm()
    }
  }

  _clear = ()=>{
      this.setState({
        isLoading: false,
        isLoadingConfirmed: false,
        isConfirmed: false,
        result: {isExist: false, isSuccess: false,message: '' },
        resultConfirmed: { isExist: false,isSuccess: false,  message: ''}
      })
  }


  _load_fio = async (iin)=>{
        const language = Language[this.props.language].AppointmentFreeContainer
        LayoutAnimation.easeInEaseOut();
        this.setState({
            isLoading: true,
            isConfirmed: false,
            isLoadingConfirmed: true
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
        await this.props._openTokenSet()
        await this.props._hostsGet()
        let {hosts} = this.props

        let HOST_OBJECT = {}
        let ACTIVE_HOST_DYNAMIC = this.state.activeHost
        if(SECOND_URL === 'EMPTY'){
            //in the first start app we set first host
            let ACTIVE_HOST_DYNAMIC = this.state.activeHost
            if(ACTIVE_HOST_DYNAMIC === 'EMPTY'){
                ACTIVE_HOST_DYNAMIC = hosts[0].apiUrlHttps
                this.setState({activeHost: ACTIVE_HOST_DYNAMIC})
            }
            //This method for matching hospital name to ACTIVE_HOST_DYNAMIC
            for(let i = 0; i<hosts.length; i++){
                if(hosts[i].apiUrlHttps === ACTIVE_HOST_DYNAMIC){
                    this.setState({hospital: hosts[i].name})
                    HOST_OBJECT = hosts[i]
                    break;
                }
            }
        }else{
            ACTIVE_HOST_DYNAMIC = SECOND_URL
            this.setState({activeHost: ACTIVE_HOST_DYNAMIC})
        }
            /**
             * STEP 1This method for finding rooms for user
             */
            const TOKEN  = await getToken(ACTIVE_HOST_DYNAMIC)
            const URL_ROOM = ACTIVE_HOST_DYNAMIC + '/spring-ds/mobile/findRoom?onlyPatientTerritory=false&iin='+this.state.iin

            try{
                let res = await Axios.get(URL_ROOM,{"headers": {"Authorization": TOKEN }})
                LayoutAnimation.easeInEaseOut();
                if(Array.isArray(res.data)){
                    console.log('$$$RES_FIND_ROOM', res.data.length, URL_ROOM)
                    this.setState({doctors: res.data})
                }else{
                    console.log('$$$RES_FIND_ROOM_EMPTY', URL_ROOM)
                    this.setState(this.setState({doctors: []}))
                }
            }catch(err){
                console.log('$$$ERR_FIND_ROOM', err, URL_ROOM, TOKEN, )
                if(SECOND_URL === 'EMPTY'){
                    await this._confirm(HOST_OBJECT.apiUrlHttp)
                }else{
                    this.setState({doctors: []})
                }
                //THERE SHOULD BE HANDLED ERROR
            }

        this.setState({
            isLoadingConfirmed: false,
            isConfirmed: true,
            resultConfirmed: { isExist: true, isSuccess: true, message: '', }
        })
  }

  _onHostChange = async(host)=>{
      this.setState({activeHost: host})
      await this._confirm()
  }

  render() {
    const language = Language[this.props.language]
    return (
      <Holder>
        <AppointmentFee
        language = {language.AppointmentFreeContainer}
        LN = {language.is} 
        state = {this.state}
        _load_fio = {(iin)=>{ this._load_fio(iin) }}
        _confirm = {this._confirm}
        _clear = {this._clear}
        hosts = {this.props.hosts}
        activeHost = {this.state.activeHost}
        _onHostChange = {this._onHostChange}
        _agendaRequest = {(key)=>{ 
            this.props.navigation.navigate('Agenda', {
                roomId: key, 
                user: { 
                    fio: this.state.fio,
                    iin: this.state.iin
                },
                HOST_DYNAMIC: this.state.activeHost
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

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentFeeContainer)