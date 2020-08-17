import { Dispatch } from "redux"
import { FeedbackAction } from "../utils/appTypes"
import { UPDATE_FEEDBACK, CLEAR_FEEDBACK } from '../constants/actionTypes'

// Redux action creator
export const updateFeedback = (feedbackMessage: string): FeedbackAction => ({
    type: UPDATE_FEEDBACK,
    payload: {
        message: feedbackMessage
    }
})

export const clearFeedback = (): FeedbackAction => ({
    type: CLEAR_FEEDBACK,
    payload: {
        message: null
    }
})

// Thunk action function
export function clearFeedbackMessage() {
    return (dispatch: Dispatch<FeedbackAction>) => {
        dispatch(clearFeedback())
    }
}