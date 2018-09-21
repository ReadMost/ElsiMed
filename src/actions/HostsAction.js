import * as types from './Types'
import { AsyncStorage} from 'react-native';
import axios from 'axios'
import {OPEN_TOKEN_CREDENTIALS, HOST} from '../settings'
import {clearTokens} from './AppAction'
import {clearTokens as clearHostTokens} from '../util/Functions'

//=======================CLEAR TOKEN===================
export async function clearHosts(){
    await AsyncStorage.removeItem('host_settings')
}



//=======================GENERAL FUNCTIONS===================

async function setHostsSettings(host_settings){
    await AsyncStorage.setItem('host_settings', JSON.stringify(host_settings))
}

async function getHostsSettings(){
    //await clearHosts()
    const host_settings = await AsyncStorage.getItem('host_settings');
    let payload = {
        hosts: [],
        expires_in: 0,
        status: 'OK'
    }
    if(host_settings === null){
        await setHostsSettings(payload)
        console.log('HOST IS NULL', payload )
    }else{
        payload = JSON.parse(host_settings)
        console.log('HOST NOT NULL' )
    }
    return payload
}

//===================================GET=================================
function onHostsPending(){
    return {
        type: types.HOSTS_GET_PENDING,
        payload: null
    }
}

function onHostsFulfilled(obj){
    return {
        type: types.HOSTS_GET_FULFILLED,
        payload: obj
    }
}

/**
 *  Method for checking token
 */
export async function onHostsGet(){
    return async (dispatch, getState) => {
        dispatch(onHostsPending())
        const {token, host} = getState().AppReducer
        let payload = await getHostsSettings()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": host + "/spring-ds/mobile/systemNodes",
            "method": "POST",
            "headers": {
              "Authorization": token,
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-cache",
            },
            "data": "0b1861b4-5c1d-4686-9280-7bab96b8ffe6"
        }        
        if(payload.hosts === [] || payload.expires_in <= Math.round(Date.now()/1000) ){
            try {
                let res = await axios(settings)
                await clearHosts()
                console.log('$$$RES_GET_HOST', host)
                payload.status = 'OK',
                payload.hosts = res.data,
                payload.expires_in = Math.round(Date.now()/1000) + 10   
                await setHostsSettings(payload)
                dispatch(onHostsFulfilled(payload)) 
            }catch(error){
                console.log('$$$ERR_GET_HOST 1 IP', error)
                //if we can not get hosts then we need to change ip address
                await clearTokens()
                //we clear the cach of tokens of hosts
                await clearHostTokens()
                await setHostsSettings(payload)
                dispatch(onHostsFulfilled(payload)) 
            }
        }else{
            dispatch(onHostsFulfilled(payload)) 
            console.log('HOST IS FINE')
        }
        
    }
}