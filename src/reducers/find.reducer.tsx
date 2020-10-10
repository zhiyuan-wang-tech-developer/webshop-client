import { FoundResultState, FoundResultAction } from '../utils/app.types'
import { UPDATE_FOUND_RESULTS, CLEAR_FOUND_RESULTS } from '../constants/action.types'

const initialState: FoundResultState = {
    itemsTotal: 0,
    pageItems: [],
    pageCurrent: 1,
    pageTotal: 1
}

const findReducer = (state = initialState, action: FoundResultAction): FoundResultState => {
    switch (action.type) {
        case UPDATE_FOUND_RESULTS:
            return action.payload ? action.payload.result : state

        case CLEAR_FOUND_RESULTS:
            return initialState;

        default:
            return state;
    }
}

export default findReducer