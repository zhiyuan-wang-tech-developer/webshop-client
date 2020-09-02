import { TableActionsState, TableActionsAction } from '../utils/appTypes'
import { UPDATE_TABLE_ACTIONS, CLEAR_TABLE_ACTIONS } from '../constants/actionTypes'

const initialState: TableActionsState = []

const tableActionsReducer = (state = initialState, action: TableActionsAction): TableActionsState => {
    switch (action.type) {

        case UPDATE_TABLE_ACTIONS:
            return [...action.payload]

        case CLEAR_TABLE_ACTIONS:
            return initialState

        default:
            return state
    }
}

export default tableActionsReducer