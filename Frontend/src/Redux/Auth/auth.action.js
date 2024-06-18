import axios from "axios"
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, POSTS_FAILURE, POSTS_REQUEST, POSTS_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"
import { api } from "../../config/api"

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({type:LOGIN_REQUEST})
    try {
        const { data } = await axios.post('http://localhost:8080/auth/signin',loginData)
        if (data.token) {
            localStorage.setItem("jwt", data.token)
        }
        console.log("login success ",data);
        dispatch ({type: LOGIN_SUCCESS, payload:data.token})

    } catch (error) {
        dispatch({type:LOGIN_FAILURE,payload:error})
    }
}

export const registerUserAction = (loginData) => async (dispatch) => {
    console.log(loginData);
    dispatch({type:REGISTER_REQUEST})
    try {
        console.log(loginData);
        const { data } = await axios.post('http://localhost:8080/auth/signup', loginData,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(data);
        if (data.token) {
            localStorage.setItem("jwt",data.token)
        }
        
        dispatch ({type: REGISTER_SUCCESS, payload: data.token })

    } catch (error) {
        dispatch({type:REGISTER_FAILURE,payload:error})
    }
}

export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({type:GET_PROFILE_REQUEST})
    try {
        
        const { data } = await axios.get('http://localhost:8080/api/users/profile',{
            headers:{
                "Authorization": `Bearer ${jwt}`,
            },
        });
        console.log("profile:" ,data);
        
        
        dispatch ({type: GET_PROFILE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({type:GET_PROFILE_FAILURE,payload:error})
    }
}

export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try {
        
        const { data } = await api('http://localhost:8080/api/users', reqData);
        console.log("profile:" ,data);
        
        
        dispatch ({type: UPDATE_PROFILE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({type:UPDATE_PROFILE_FAILURE,payload:error})
    }
}
export const seeAllPosts = (jwt) => async (dispatch) => {
    dispatch({type:POSTS_REQUEST})
    try {
        const { data } = await axios.get('http://localhost:8080/posts',{
            headers:{
                Authorization: `Bearer ${jwt}`,
            }
        })
        console.log("posts ",data);
        dispatch ({type: POSTS_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type:POSTS_FAILURE,payload:error})
    }
}
