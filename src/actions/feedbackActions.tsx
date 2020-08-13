import { FeedbackActionType } from "../utils/appTypes"
import { Dispatch } from "react"
import { UPDATE_FEEDBACK, CLEAR_FEEDBACK } from '../constants/actionTypes'

// Redux action creator
export const updateFeedback = (feedbackMessage: string): FeedbackActionType => ({
    type: UPDATE_FEEDBACK,
    payload: {
        message: feedbackMessage
    }
})

export const clearFeedback = (): FeedbackActionType => ({
    type: CLEAR_FEEDBACK,
    payload: {
        message: null
    }
})

// Thunk action function
export function clearFeedbackMessage() {
    return (dispatch: Dispatch<FeedbackActionType>) => {
        dispatch(clearFeedback())
    }
}