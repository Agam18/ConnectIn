import { alertClasses } from "@mui/material"
import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, POSTS_FAILURE, POSTS_REQUEST, POSTS_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actionType"

const initialState = {
    jwt: null,
    error: null,
    loading: false,
    allposts: null,
    user:null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case POSTS_REQUEST:
        case GET_PROFILE_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_PROFILE_SUCCESS:
            return {...state,user:action.payload,loading:false,erroe:null}
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, jwt: action.payload, loading: false, error: null }
        case POSTS_SUCCESS:
            return {...state, alertClasses: action.payload, loading:false, error:null}
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case POSTS_FAILURE:
            return {
                ...state, loading: false, error: action.payload
            }

        default:
            return state;
    }
}

