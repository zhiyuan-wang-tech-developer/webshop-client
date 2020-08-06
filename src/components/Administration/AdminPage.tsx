import React, { Component } from 'react'
import InventoryContainer from './InventoryContainer'
import AdminNavBar from './AdminNavBar'

export default class AdminPage extends Component {
    render() {
        return (
            <>
                <AdminNavBar />
                <InventoryContainer />
            </>
        )
    }
}
