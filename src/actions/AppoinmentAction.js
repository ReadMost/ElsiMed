import * as types from './Types'
import { AsyncStorage} from 'react-native';



//=======================GENERAL FUNCTIONS===================

async function setAppointmentSettings(appointments_settings){
    await AsyncStorage.setItem('appointments_settings', JSON.stringify(appointments_settings))
}

async function getAppointmentsSettings(){
    //await AsyncStorage.clear()
    const appointments_settings = await AsyncStorage.getItem('appointments_settings');
    let payload = {
        appointments: []
    }
    if(appointments_settings === null){
        await setAppointmentSettings(payload)
        console.log('IS NULL APPOI', payload )
    }else{
        payload = JSON.parse(appointments_settings)
    }
    return payload
}


//=======================SET APPOINTMENT===================
function onAppointmentSetPending(){
    return {
        type: types.APPOINTMENT_SET_PENDING,
        payload: null
    }
}

function onAppointmentSetFulfilled(obj){
    return {
        type: types.APPOINTMENT_SET_FULFILLED,
        payload: obj
    }
}

/**
 *  Method for adding elements
 */
export function onAppointmentSet(obj){
    return async dispatch => {
        dispatch(onAppointmentSetPending())
        let payload = await getAppointmentsSettings()
        payload.appointments.push(obj)
        await setAppointmentSettings(payload)
        dispatch(onAppointmentSetFulfilled(payload))
    }
}

//=======================APPOINTMENT_GETTING===================
function onAppointmentGetPending(){
    return {
        type: types.APPOINTMENT_GET_PENDING,
        payload: null
    }
}

function onAppointmentGetFulfilled(obj){
    return {
        type: types.APPOINTMENT_GET_FULFILLED,
        payload: obj
    }
}

/**
 *  Method for getting
 */
export function onAppointmentGet(){
    return async dispatch => {
        dispatch(onAppointmentGetPending())
        console.log('###suk')
        let payload = await getAppointmentsSettings()
        dispatch(onAppointmentGetFulfilled(payload))
    }
}

//=======================APPOINTMENT_DELETE===================
function onAppointmentDeletePending(){
    return {
        type: types.APPOINTMENT_DELETE_PENDING,
        payload: null
    }
}

function onAppointmentDeleteFulfilled(obj){
    return {
        type: types.APPOINTMENT_DELETE_FULFILLED,
        payload: obj
    }
}

/**
 *  Method for delete
 */
export function onAppointmenDelete(id){
    return async dispatch => {
        dispatch(onAppointmentDeletePending())
        let payload = await getAppointmentsSettings()
        let new_payload = []
        for(let i = 0; i < payload.appointments.length; i++ ){
            if(i !== id){
                new_payload.push(payload.appointments[i])
            }
        }
        payload.appointments = new_payload
        await setAppointmentSettings(payload)
        dispatch(onAppointmentDeleteFulfilled(payload))
    }
}