import {combineReducers} from 'redux'
import AppReducer from './AppReducer'
import UserReducer from './UserReducer'
import AppointmentReducer from './AppointmentReducer'
import HostsReducer from './HostsReducer'

export default combineReducers({
    AppReducer,
    UserReducer,
    AppointmentReducer,
    HostsReducer
})