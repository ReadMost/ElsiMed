import Axios from 'axios'
import {OPEN_TOKEN_CREDENTIALS} from '../settings'
import {AsyncStorage} from 'react-native'
import {clearTokens as clearAppToken} from '../actions/AppAction'

/**
 * payload = [{token: '', host: '', expires_in: 1111}]
 */


async function setTer(hosts_tokens){
    await AsyncStorage.setItem('hosts_tokens', JSON.stringify(hosts_tokens))
}

async function getTer(){
    await clearTokens()
    const hosts_tokens = await AsyncStorage.getItem('hosts_tokens');
    let payload = []
    //console.log('TOKENS', hosts_tokens)
    if(hosts_tokens === null){
        await setTer(payload)
        //console.log('IS NULL HOSTS_TOKENS', payload )
    }else{
        payload = JSON.parse(hosts_tokens)
        //console.log('NOT NULL HOSTS_TOKENS', payload )
    }
    return payload
}

export async function clearTokens(){
    await AsyncStorage.removeItem('hosts_tokens')
}

export async function getToken(HOST){
    //console.log('$$$TOKEN_FOR_HOST', HOST)
    let hosts_tokens = await getTer()
    let new_hosts_tokens = []
    //if the token found on AsyncStorage
    let isHit = false
    let hit_token = '' 
    if(hosts_tokens.length > 100){
        //console.log('$$$TOKEN_FOR_HOST_EXCEEDED_100_LOW')
        await clearTokens()
    }
    for(let i = 0; i < hosts_tokens.length; i++){
        if(hosts_tokens[i].expires_in > Math.round(Date.now()/1000)){
            new_hosts_tokens.push(hosts_tokens[i])
            if(hosts_tokens[i].host === HOST){
                isHit = true
                hit_token = hosts_tokens[i].token
            }
        }
    }
    if(isHit){
        await setTer(new_hosts_tokens)
        console.log('YES IT IS HIT!!!!', hit_token)
        return hit_token
    }else{
        try {
            console.log('OOO NO IT IS MISS!!!!', hit_token)
            let res = await Axios.post(HOST + '/oauth/token',OPEN_TOKEN_CREDENTIALS)
            TOKEN = "Bearer "+res.data.access_token
            let ITEM = {
                token: TOKEN,
                host: HOST,
                expires_in: res.data.expires_in + Math.round(Date.now()/1000)
            }
            new_hosts_tokens.push(ITEM)
            console.log('$$$RES_TOKEN_FOR_HOST',HOST, TOKEN)
            await setTer(new_hosts_tokens)
            return TOKEN
        }catch(error){
            //console.log('$$$ERR_TOKEN_FOR_HOST', error)
            await setTer(new_hosts_tokens)
            return 'TOKEN_GET_ERROR_TOKEN_IS_EMPTY';
        }
    }
}



//=======================================POST FIO============================================

export async function postFio(host, token, iin, doNotExist, repeatAgain ){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": host + "/spring-ds/mobile/findPatient",
        "method": "POST",
        "headers": {
          "Authorization": token,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        "processData": false,
        "data": iin
    }

    try {
        //console.log('OOO NO IT IS MISS!!!!', hit_token)
        let res = await Axios(settings)
        console.log('$$$RES_FIND_PATIENT', host, token)
        if(res.data === ""){
            return {
                nextState: {
                    isLoading: false,
                    isLoadingConfirmed: false,
                    result: {isExist: true,isSuccess: false, message: doNotExist }
                },
                isSuccess: true,
            }
        }else{
            return {
                nextState: {
                    isLoading: false,
                    isLoadingConfirmed: false,
                    result: { isExist: true,isSuccess: true,},
                    fio: res.data.lastName + ' ' + res.data.firstName + ' ' + res.data.secondName,
                    iin: iin,
                    personId: res.data.PersonID,
                    user: res.data
                },
                isSuccess: true,
            }
        }

    }catch(error){
        console.log('$$$ERR_FIND_PATIENT', error, host)
        await clearAppToken()
        return {
            nextState: {
                isLoading: false,
                isLoadingConfirmed: false,
                result: { isExist: true, isSuccess: false, message: repeatAgain, },
                fio: ''
            },
            isSuccess: false,
        }
    }
}