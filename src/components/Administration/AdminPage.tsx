import React, { Component } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'
import AdminUserContainer from "./AdminUser/Container"
import GroupContainer from "./Group/Container"
import InventoryContainer from './Inventory/Container'
import AuthorityContainer from './Authority/Container'
import AddInventoryForm from './AddInventory/AddInventoryForm'
import AddInventoryDetailForm from './AddInventory/AddInventoryDetailForm'
import FindInventoryForm from './FindInventory/FindInventoryForm'

const AdminPageContent = () => {
    const { url } = useRouteMatch()
    return (
        <>
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