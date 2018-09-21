import * as types from '../actions/Types'

let initialState = {
    isFirstStart: true,
    isFirstStartLoading: true,
    token: '',
    expires_in: 0,
    host: '',
    isTokenLoading: false,
    language: 0,
    isLanguageLoading: false,
}

export default function AppReducer(state = initialState, action){
    switch(action.type){
        case types.FIRST_START_PENDING: {
            return Object.assign({}, state, {
                isFirstStartLoading: true
            })
        }
        case types.FIRST_START_FULFILLED: {
            return Object.assign({}, state, {
                isFirstStartLoading: false,
                isFirstStart: false,
                token: action.payload.token,
                host: action.payload.host,
                expires_in: action.payload.expires_in,
                language: action.payload.language,
            })
        }
        case types.OPEN_TOKEN_PENDING: {
            return Object.assign({}, state, {
                isTokenLoading: true
            })
        }
        case types.OPEN_TOKEN_FULFILLED:{
            return Object.assign({}, state, {
                isTokenLoading: false,
                token: action.payload.token,
                host: action.payload.host,
                expires_in: action.payload.expires_in
            })
        }
        case types.LANGUAGE_CHANGE_PENDING: {
            return Object.assign({}, state, {
                isLanguageLoading: true
            })
        }
        case types.LANGUAGE_CHANGE_FULFILLED: {
            return Object.assign({}, state, {
                isLanguageLoading: false,
                language: action.payload.language
            })
        }
    }
    return state
}