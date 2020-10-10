import { Response, get, post } from 'superagent'
import { Dispatch } from 'redux'
import { urlAdminUsers, urlTableActionsByAdminUser, urlAdminLogin, COOKIE_KEY_ADMIN } from '../constants/config'
import { STORE_ADMIN_USER, CLEAR_ADMIN_USER, UPDATE_TABLE_ACTIONS, CLEAR_TABLE_ACTIONS } from '../constants/action.types'
import { AdminUser, AdminUserAction, TableAction, TableActionsAction, LoginAdmin } from '../utils/app.types'
import Cookies from 'js-cookie'

// actions creator
function storeAdminUser(adminUser: AdminUser): AdminUserAction {
    return {
        type: STORE_ADMIN_USER,
        payload: {
            adminUser
        }
    }
}

function clearAdminUser(): AdminUserAction {
    return {
        type: CLEAR_ADMIN_USER,
        payload: {
            adminUser: null
        }
    }
}

function updateTableActions(tableActions: TableAction[]): TableActionsAction {
    return {
        type: UPDATE_TABLE_ACTIONS,
        payload: tableActions
    }
}

function clearTableActions(): TableActionsAction {
    return {
        type: CLEAR_TABLE_ACTIONS,
        payload: []
    }
}

export function getAdminUser(adminUserId: number) {
    return (dispatch: Dispatch<AdminUserAction>) => {
        get(urlAdminUsers + `/${adminUserId}`)
            .send()
            .then((response: Response) => {
                const { adminUser } = response.body
                if (!adminUser) {
                    throw new Error(`Can not get admin user by ID ${adminUserId}`);
                }
                dispatch(storeAdminUser(adminUser))
            })
            .catch(console.error)
    }
}

export function getTableActionsByAdminUser(adminUserId: number) {
    return (dispatch: Dispatch<TableActionsAction>) => {
        get(urlTableActionsByAdminUser(adminUserId))
            .send()
            .then((response: Response) => {
                const { tableActions } = response.body
                if (!tableActions) {
                    throw new Error("Can not get table actions!");
                }
                dispatch(updateTableActions(tableActions))
            })
            .catch(console.error)
    }
}

export function Login(user: LoginAdmin) {
    return (dispatch: Dispatch<AdminUserAction>) => {
        post(urlAdminLogin)
            .send(user)
            .then((response: Response) => {
                const { adminUser } = response.body
                if (!adminUser) {
                    throw new Error("Can not get admin user and login failed...");
                }
                dispatch(storeAdminUser(adminUser)) // TODO: no store data
                Cookies.set(COOKIE_KEY_ADMIN, JSON.stringify(adminUser))     // TODO: store token
                sessionStorage.setItem(COOKIE_KEY_ADMIN, JSON.stringify(adminUser))
            })
            .then(() => {
                window.location.pathname = "/admin"
            })
            .catch((err) => {
                console.error(err)
            })
    }
}

export function Logout() {
    return (dispatch: Dispatch<AdminUserAction>) => {
        dispatch(clearAdminUser())
    }
}