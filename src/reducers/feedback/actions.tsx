import { FeedbackActionType } from "./reducer"
import { Dispatch } from "react"

export const UPDATE_FEEDBACK = "UPDATE_FEEDBACK"
export const CLEAR_FEEDBACK = "CLEAR_FEEDBACK"

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