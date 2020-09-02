import { AdminUserState, AdminUserAction } from '../utils/appTypes'
import { STORE_ADMIN_USER, CLEAR_ADMIN_USER } from '../constants/actionTypes'

const initialState: AdminUserState = {
    adminUser: null
}

const adminUserReducer = (state = initialState, action: AdminUserAction) => {
    switch (action.type) {

        case STORE_ADMIN_USER:
            return { adminUser: { ...action.payload.adminUser } }

        case CLEAR_ADMIN_USER:
            return initialState

        default:
            return state
    }
}

export default adminUserReducer