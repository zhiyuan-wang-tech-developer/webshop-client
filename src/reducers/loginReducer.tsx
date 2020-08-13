import { STORE_JSON_WEB_TOKEN, CLEAR_JSON_WEB_TOKEN } from '../constants/actionTypes'
import { TokenStateType, TokenActionType } from '../utils/appTypes'

const initialState: TokenStateType = {
    token: null
}

const tokenReducer = (state = initialState, action: TokenActionType): TokenStateType => {
    switch (action.type) {
        case STORE_JSON_WEB_TOKEN:
            return { token: action.payload.token }

        case CLEAR_JSON_WEB_TOKEN:
            return { token: null }

        default:
            return state
    }
}

export default tokenReducer