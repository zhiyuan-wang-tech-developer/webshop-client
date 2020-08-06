import { UserLoginType, UserRegisterType } from '../../components/Types/CustomTypes'
import request from 'superagent'
import Config from '../../configuration'
import { TokenActionType } from './reducer'
import { Dispatch } from 'react'
import { FeedbackActionType } from '../feedback/reducer'
import { updateFeedback } from '../feedback/actions'

const baseURL = Config.URL.LocalHostURL

// action type
export const STORE_JSON_WEB_TOKEN = "STORE_JSON_WEB_TOEKN"
export const CLEAR_JSON_WEB_TOKEN = "CLEAR_JSON_WEB_TOEKN"

// action creator
function storeToken(token: string): TokenActionType {
    return {
        type: STORE_JSON_WEB_TOKEN,
        payload: { token }
    }
}

function clearToken(): TokenActionType {
    return {
        type: CLEAR_JSON_WEB_TOKEN,
        payload: { token: null }
    }
}

// Thunk action functions
export function Register(user: UserRegisterType) {
    return (dispatch: Dispatch<FeedbackActionType>) => {
        request
            .post(`${baseURL}/users`)
            .set('content-type', 'application/json')
            .send(user)
            .then((response: any) => {
                console.log(JSON.stringify(response.body))
                if (response.body.createdUser) {
                    // Note: createdUser.password is excluded.
                    // createdUser.shoppingCart is included.
                    delete user.password
                    // const { shoppingCart: any } = response.body.createdUser
                    delete response.body.createdUser.shoppingCart
                    if (JSON.stringify(response.body.createdUser) === JSON.stringify(user)) {
                        console.log("Successful register!")
                        dispatch(updateFeedback("Successful register!"))
                    }
                    else {
                        throw new Error("Failed register!");
                    }
                }
                else {
                    throw new Error("After register, the response body does not contain 'createdUser'");
                }
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function Login(user: UserLoginType) {
    return (dispatch: Dispatch<TokenActionType | FeedbackActionType>) => {
        request
            .post(`${baseURL}/users/login`)
            .send(user)
            .then((response: any) => {
                if (response.body.token) {
                    console.log(`User logged in with token ${JSON.stringify(response.body)}`)
                    dispatch(storeToken(response.body.token))
                    dispatch(updateFeedback("User logged in"))
                }
                else {
                    throw new Error("Token not found... Login failed...");
                }
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function Logout() {
    return (dispatch: Dispatch<TokenActionType>) => {
        dispatch(clearToken())
    }
}