import { FoundResultState, FoundResultAction } from '../utils/appTypes'
import { UPDATE_FOUND_RESULTS, CLEAR_FOUND_RESULTS } from '../constants/actionTypes'

const initialState: FoundResultState = {
    items: [],
    itemsTotalCount: 0,
    currentPage: 1,
    totalPages: 1
}

const findReducer = (state = initialState, action: FoundResultAction): FoundResultState => {
    switch (action.type) {
        case UPDATE_FOUND_RESULTS:
            return action.payload.result
            break;

        case CLEAR_FOUND_RESULTS:
            return initialState;
            break;

        default:
            return state;
    }
}

export default findReducer