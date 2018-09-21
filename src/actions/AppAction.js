import * as types from './Types'
import { AsyncStorage} from 'react-native';
import axios from 'axios'
import {OPEN_TOKEN_CREDENTIALS, HOSTS_LIST} from '../settings'
import {clearHosts} from './HostsAction'



//=======================CLEAR TOKEN===================
export async function clearTokens(){
    await AsyncStorage.removeItem('app_settings')
}

//=======================GENERAL FUNCTIONS===================

async function setAppSettings(app_settings){
    await AsyncStorage.setItem('app_settings', JSON.stringify(app_settings))
}

async function getAppSettings(){
    //await clearTokens()
    const app_settings = await AsyncStorage.getItem('app_settings');
    let payload = {
        token: 'EMPTY',
        host: HOSTS_LIST[0],
        expires_in: 0,
        host_id: 0,
        language: 0,
    }
    if(app_settings === null){
        await setAppSettings(payload)
        console.log('IS NULL', payload )
    }else{
        payload = JSON.parse(app_settings)
        console.log('NOT NULL', payload )
    }
    return payload
}

//=======================SET TOKEEN===================
function onOpenTokenPending(){
    return {
        type: types.OPEN_TOKEN_PENDING,
        payload: null
    }
}

function onOpenTokenFulfilled(obj){
    return {
        type: types.OPEN_TOKEN_FULFILLED,
        payload: obj
    }
}

/**
 * 
 * @param {the current host to make request} active_host 
 * @param {the universal value format} payload 
 * @param {the current host index in HOSTS_LIST} host_id 
 * @param {Determin is Start of recursion or not} isRecursion 
 * @param {The count for limit a recursion if it is last host it finish} recursionCount 
 * @returns {the Payload obj if SUCCESS or return null}
 */
async function getTokenHelper(active_host, payload, host_id, isRecursion = false, recursionCount = 0){
    console.log('SEARCHING_WORKING_HOST', active_host)
    //the case when recursion rich the end
    if(isRecursion && recursionCount === 0){
        return null
    }else{
        try {
            let res = await axios.post(active_host + '/oauth/token',OPEN_TOKEN_CREDENTIALS)
            //console.log('TOKEN_SUCCESS', active_host, res)
            payload.token = "Bearer "+res.data.access_token
            payload.host = active_host
            payload.expires_in = res.data.expires_in + Math.round(Date.now()/1000)
            payload.host_id = host_id
            return payload
        }catch(error){
            //console.log('TOKEN_ERROR', HOSTS_LIST[2], error)
            if(isRecursion){
                let next_host_id = (host_id + 1)%HOSTS_LIST.length
                let next_recursionCount = recursionCount - 1
                return await getTokenHelper(HOSTS_LIST[next_host_id], payload, next_host_id, true, next_recursionCount)
            }else{
            //this is FIRST START of Recursion
                //here we get next HOST id
                let next_host_id = (host_id + 1)%HOSTS_LIST.length
                let next_recursionCount = HOSTS_LIST.length - 1
                return await getTokenHelper(HOSTS_LIST[next_host_id], payload, next_host_id, true, next_recursionCount)
            }
        }
    }
}

/**
 *  Method for checking token
 */
export async function onOpenTokenSet(){
    return async dispatch => {
        dispatch(onOpenTokenPending())
        let payload = await getAppSettings()

        if(payload.token === 'EMPTY' || payload.expires_in <= Math.round(Date.now()/1000) ){
                console.log('SETTING TOKEN')
                let RESULT = await getTokenHelper(payload.host, payload, payload.host_id)
                if(RESULT === null){
                    console.log('SORRY_ALL_HOSTS_DO_NOT_WORK')
                    dispatch(onOpenTokenFulfilled(payload)) 
                }else{
                //HERE SUCCESS
                    console.log('WE_FOUND_WORKING_HOST', payload.host)
                    //we clear a list of hosts after switching
                    await clearHosts()
                    await setAppSettings(RESULT)
                    dispatch(onOpenTokenFulfilled(RESULT)) 
                }
        }else{
            dispatch(onOpenTokenFulfilled(payload)) 
            console.log('TOKEN IS FINE')
        }
        
    }
}



//=======================FIRST START===================
function onFirstStartPending(){
    return {
        type: types.FIRST_START_PENDING,
        payload: null
    }
}

function onFirstStartFulfilled(obj){
    return {
        type: types.FIRST_START_FULFILLED,
        payload: obj
    }
}


/** ***********************START*************************
 * This is method is important when app turn on first Time 
 * this will run and SET all nesessary staff to AsyncStorage
 * or GET the
 */
export function onFirstStart(){
    return async dispatch => {
        dispatch(onFirstStartPending())
        dispatch(await onOpenTokenSet())
        const payload = await getAppSettings()
        dispatch(onFirstStartFulfilled( payload ))
    }
}
















//=======================LANGUAGE CHANGE===================


function onLanguageChangePending(){
    return {
        type: types.LANGUAGE_CHANGE_PENDING,
        payload: null
    }
}

function onLanguageChangeFulfilled(obj){
    return {
        type: types.LANGUAGE_CHANGE_FULFILLED,
        payload: obj
    }
}

export function onLanguageChange(){
    return async dispatch=>{
        dispatch(onLanguageChangePending())
        let app_settings = await getAppSettings()
        app_settings.language = (app_settings.language + 1)%2
        await setAppSettings(app_settings)
        dispatch(onLanguageChangeFulfilled(app_settings))
    }
}




