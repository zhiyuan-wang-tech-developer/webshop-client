import { STORE_JSON_WEB_TOKEN, CLEAR_JSON_WEB_TOKEN } from '../constants/action.types'
import { TokenState, TokenAction } from '../utils/app.types'

const initialState: TokenState = {
    token: null
}

const tokenReducer = (state = initialState, action: TokenAction): TokenState => {
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