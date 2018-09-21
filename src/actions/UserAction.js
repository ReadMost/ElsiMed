import * as types from './Types'
import { AsyncStorage} from 'react-native';


//for test
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//=======================GENERAL FUNCTIONS===================

async function setUserSettings(user_settings){
    await AsyncStorage.setItem('user_settings', JSON.stringify(user_settings))
}

async function getUserSettings(){
    //await AsyncStorage.clear()
    const user_settings = await AsyncStorage.getItem('user_settings');
    let payload = {
        userFio: '',
        userId: -1,
        userToken: '',
        expires_in: 0,
        isAuthenticated: false,
    }
    if(user_settings === null){
        await (payload)
        console.log('IS USER NULL', payload )
    }else{
        payload = JSON.parse(user_settings)
        console.log('NOT USER NULL', payload )
    }
    return payload
}

//=======================CHECKER===================



//=======================AUTHENTICATION===================
function onAuthenticationPending(){
    return {
        type: types.AUTHENTICATION_PENDING,
        payload: null
    }
}

function onAuthenticationFulfilled(obj){
    return {
        type: types.AUTHENTICATION_FULFILLED,
        payload: obj
    }
}

export async function onAuthentication(obj){
    return async dispatch=>{
        console.log('CREDNTIALS', obj)
        dispatch(onAuthenticationPending())
        let user_settings = await getUserSettings()
        //here is going to fetch from server
        await timeout(500)
        user_settings = {
            userFio: 'Duisebay Yerkebulan Duisebay',
            userId: 111,
            userToken: "Bearer " + 'test',
            expires_in: 1000 + Math.round(Date.now()/1000) - 3,
            isAuthenticated: true,
        }
        await setUserSettings(user_settings)
        dispatch(onAuthenticationFulfilled(user_settings))

    }
}