import request, { Response } from 'superagent'
import Config from '../configuration'
import { Dispatch } from 'react'
import { updateFeedback } from './feedbackActions'
import { UserLoginType, UserRegisterType, FeedbackActionType, TokenActionType } from '../utils/appTypes'
import { STORE_JSON_WEB_TOKEN, CLEAR_JSON_WEB_TOKEN } from '../constants/actionTypes'

const baseURL = Config.URL.LocalHostURL

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
            .then((response: Response) => {
                if (!response.body.createdUser) {
                    throw new Error("After register, the response body does not contain 'createdUser'");
                }
                // Note: 
                // createdUser.password is excluded.
                // createdUser.shoppingCart is included.
                delete user.password
                // const { shoppingCart: any } = response.body.createdUser
                delete response.body.createdUser.shoppingCart
                if (JSON.stringify(response.body.createdUser) !== JSON.stringify(user)) {
                    throw new Error("Failed register!");
                }
                console.log("Successful register!")
                dispatch(updateFeedback("Successful register!"))
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
            .then((response: Response) => {
                if (!response.body.token) {
                    throw new Error("Token not found... Login failed...");
                }
                console.log(`User logged in with token ${JSON.stringify(response.body)}`)
                dispatch(storeToken(response.body.token))
                dispatch(updateFeedback("User logged in"))
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