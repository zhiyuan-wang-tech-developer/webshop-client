import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import InventoryContainer from './Inventory/Container'
import AdminUserContainer from "./AdminUser/Container";
import AdminNavBar from './AdminNavBar'

export default class AdminPage extends Component {
    render() {
        return (
            <>
                <AdminNavBar />
                <AdminUserContainer />
                {/* <InventoryContainer /> */}
            </>
        )
    }
}
