import * as types from '../actions/Types'

let  initialState =  {
    userFio: '',
    userId: -1,
    userToken: '',
    expires_in: 0,
    isAuthenticated: false,
    userLoading: false,
}

export default function UserReducer(state = initialState, action){
    switch(action.type){
        case types.AUTHENTICATION_PENDING: {
            return Object.assign({}, state, {
                userLoading: true
            })
        }
        case types.AUTHENTICATION_FULFILLED: {
            return Object.assign({}, action.payload, {
                userLoading: false
            })
        }
    }
    return state
}