import * as types from '../actions/Types'

let initialState = {
    appointments: []
}

export default function AppointmentReducer(state = initialState, action){
    switch(action.type){
        case types.APPOINTMENT_SET_FULFILLED: {
            return Object.assign({}, state, action.payload)
        }
        case types.APPOINTMENT_GET_FULFILLED: {
            return Object.assign({}, state, action.payload)
        }
        case types.APPOINTMENT_DELETE_FULFILLED: {
            return Object.assign({}, state, action.payload)
        }
    }
    return state
}