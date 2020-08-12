import { UPDATE_FEEDBACK, CLEAR_FEEDBACK } from '../constants/actionTypes'
import { FeedbackStateType, FeedbackActionType } from '../utils/customTypes'

const initialState: FeedbackStateType = {
    message: null,
    timestamp: null
}

const feedbackReducer = (state = initialState, action: FeedbackActionType): FeedbackStateType => {
    switch (action.type) {
        case UPDATE_FEEDBACK:
            return {
                message: action.payload.message,
                timestamp: new Date().toLocaleString()
            }

        case CLEAR_FEEDBACK:
            return {
                message: null,
                timestamp: null
            }

        default:
            return state
    }
}

export default feedbackReducer