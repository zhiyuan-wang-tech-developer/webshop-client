import React, { Component, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import AdminNavBar from './admin.nav.bar'
import AdminUserContainer from "./admin-user/container"
import GroupContainer from "./group/container"
import InventoryContainer from './inventory/container'
import AuthorityContainer from './authority/container'
import AddInventoryForm from './add-inventory/add.inventory.form'
import AddInventoryDetailForm from './add-inventory/add.inventory.detail.form'
import FindInventoryForm from './find-inventory/find.inventory.form'
import { getTableActionsByAdminUser } from '../../actions/login.admin.actions'
import { useCookies } from 'react-cookie'
import { COOKIE_KEY_ADMIN } from '../../constants/config'
// import { getExpiredTime } from '../../utils/helper'
// import { ExpiredTimeUnit } from '../../utils/appTypes'
import Cookies from 'js-cookie'

const AdminPageContent = () => {
    const { url } = useRouteMatch()

    return (
        <React.Fragment>
            <Route exact path={`${url}`}>
                <h1 style={{
                    position: 'fixed',
                    top: 300,
                    left: 300
                }}>Welcome to visit the Administration Page!</h1>
            </Route>
            <Route exact path={`${url}/inventory/add`}>
                <AddInventoryForm />
            </Route>
            <Route strict exact path={`${url}/inventory/edit/:id`}>
                <AddInventoryForm />
            </Route>
            <Route exact path={`${url}/inventory/detail/:id`}>
                <AddInventoryDetailForm />
            </Route>
            <Route exact path={`${url}/inventory/find`}>
                <FindInventoryForm />
            </Route>
            <Route exact path={`${url}/shoppingcart/find`}>
            </Route>
            <Route exact path={`${url}/admin-users`}>
                <AdminUserContainer />
            </Route>
            <Route exact path={`${url}/groups`}>
                <GroupContainer />
            </Route>
            <Route exact path={`${url}/authorities`}>
                <AuthorityContainer />
            </Route>
            <Route exact path={`${url}/products`}>
                <InventoryContainer />
            </Route>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        getTableActionsByAdminUser
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

class AdminPage extends Component<PropsFromRedux> {

    componentWillMount() {
        const adminValue = Cookies.get(COOKIE_KEY_ADMIN)
        if (!adminValue) {
            window.location.pathname = '/login/admin'
            return
        }

        const admin = sessionStorage.getItem(COOKIE_KEY_ADMIN)
        if (!admin) {
            return
        }
        const { id } = JSON.parse(admin)
        console.log('admin id: ', id)
        this.props.getTableActionsByAdminUser(id)
    }

    render() {
        return (
            <AdminPageWithCookie />
        )
    }
}

export default connector(AdminPage)

const AdminPageWithCookie = () => {

    // const [cookies, setCookie, removeCookie] = useCookies([COOKIE_KEY_ADMIN])

    // useEffect(() => {
    //     // setCookie(COOKIE_KEY_ADMIN, "{ id: 3 }", { expires: getExpiredTime(ExpiredTimeUnit.SECOND, 10) })
    //     console.log("Admin page cookie: ", cookies)
    // }, [cookies])

    return (
        <>
            <AdminNavBar />
            <AdminPageContent />
        </>
    )
}