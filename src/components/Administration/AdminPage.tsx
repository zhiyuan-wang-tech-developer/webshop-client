import React, { Component } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'
import AdminUserContainer from "./AdminUser/Container"
import GroupContainer from "./Group/Container"
import InventoryContainer from './Inventory/Container'

const AdminPageContent = () => {
    const { url } = useRouteMatch()
    return (
        <>
            <Route exact path={`${url}/admin-users`}>
                <AdminUserContainer />
            </Route>
            <Route exact path={`${url}/groups`}>
                <GroupContainer />
            </Route>
            <Route exact path={`${url}/inventory`}>
                <InventoryContainer />
            </Route>
        </>
    )
}

export default class AdminPage extends Component {
    render() {
        return (
            <>
                <AdminNavBar />
                <AdminPageContent />
            </>
        )
    }
}