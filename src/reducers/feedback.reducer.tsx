import { UPDATE_FEEDBACK, CLEAR_FEEDBACK } from '../constants/action.types'
import { FeedbackState, FeedbackAction } from '../utils/app.types'

const initialState: FeedbackState = {
    message: null,
    timestamp: null
}

const feedbackReducer = (state = initialState, action: FeedbackAction): FeedbackState => {
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