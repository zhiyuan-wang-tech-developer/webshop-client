import { Dispatch } from 'redux'
import request, { Response } from 'superagent'
import { urlUsers, urlLogin } from '../constants/config'
import { updateFeedback } from './feedbackActions'
import { LoginUser, RegisterUser, FeedbackAction, TokenAction } from '../utils/appTypes'
import { STORE_JSON_WEB_TOKEN, CLEAR_JSON_WEB_TOKEN } from '../constants/actionTypes'

// action creator
function storeToken(token: string): TokenAction {
    return {
        type: STORE_JSON_WEB_TOKEN,
        payload: { token }
    }
}

function clearToken(): TokenAction {
    return {
        type: CLEAR_JSON_WEB_TOKEN,
        payload: { token: null }
    }
}

// Thunk action functions
export function Register(user: RegisterUser) {
    return (dispatch: Dispatch<FeedbackAction>) => {
        request
            .post(urlUsers)
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

export function Login(user: LoginUser) {
    return (dispatch: Dispatch<TokenAction | FeedbackAction>) => {
        request
            .post(urlLogin)
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
    return (dispatch: Dispatch<TokenAction>) => {
        dispatch(clearToken())
    }
}