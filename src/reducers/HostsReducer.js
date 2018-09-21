import * as types from '../actions/Types'

let initialState = {
    hosts: [],
    expires_in: 0,
    status: 'ERROR'
}


export default function HostsReducer(state = initialState, action){
    switch(action.type){
        case types.HOSTS_GET_FULFILLED:{
            return Object.assign({}, state, action.payload)
        }
    }
    return state
}