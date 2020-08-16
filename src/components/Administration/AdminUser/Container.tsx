import React, { Component } from "react"
import { Response, get, post, put, del } from 'superagent'
import { Navbar } from 'react-bootstrap'
import AdminUserTable from './Table'
import CreateWindow from './CreateWindow'
import Config from '../../../configuration'
import { AdminUser } from "../../../utils/appTypes"

const baseURL = Config.URL.LocalHostURL

type AdminUserContainerState = {
  adminUsers: AdminUser[],
  showAddWindow: boolean
}

class AdminUserContainer extends Component<any, AdminUserContainerState> {
  state: AdminUserContainerState = {
    adminUsers: [],
    showAddWindow: false
  }

  openAddWindow = () => { this.setState({ showAddWindow: true }) };
  closeAddWindow = () => { this.setState({ showAddWindow: false }) };

  fetchAdminUsers = () => {
    get(`${baseURL}/admin/users`)
      .send()
      .then((response: Response) => {
        const { adminUsers } = response.body
        if (!adminUsers) {
          throw new Error("Can not fetch admin users!");
        }
        this.setState({ adminUsers: [...adminUsers] })
      })
      .catch(console.warn)
  }

  createAdminUser = (adminUser: AdminUser) => {
    post(`${baseURL}/admin/users`)
      .send(adminUser)
      .then((response: Response) => {
        const { createdAdminUser } = response.body
        if (!createdAdminUser) {
          throw new Error("Can not get the created admin user!");
        }
        const updatedAdminUsers = [...this.state.adminUsers, createdAdminUser]
        updatedAdminUsers.sort((userA, userB) => userA.id - userB.id)
        this.setState({ adminUsers: updatedAdminUsers })
      })
      .catch(console.warn)
  }

  updateAdminUser = (adminUser: AdminUser) => {
    put(`${baseURL}/admin/users/${adminUser.id}`)
      .send(adminUser)
      .then((response: Response) => {
        const { updatedAdminUser } = response.body
        if (!updatedAdminUser) {
          throw new Error("Can not get the updated admin user!");
        }
        const updatedAdminUsers = this.state.adminUsers.map(adminUser => {
          if (adminUser.id !== updatedAdminUser.id)
            return adminUser
          else
            return updatedAdminUser
        })
        this.setState({ adminUsers: updatedAdminUsers })
      })
      .catch(console.warn)
  }

  deleteAdminUser = (adminUserId: number) => {
    del(`${baseURL}/admin/users/${adminUserId}`)
      .send()
      .then((response: Response) => {
        const { adminUserIsDeleted } = response.body
        if (!adminUserIsDeleted) {
          throw new Error("Can not delete the admin user!");
        }
        const updatedAdminUsers = this.state.adminUsers.filter(adminUser => adminUser.id !== adminUserId)
        this.setState({ adminUsers: updatedAdminUsers })
      })
      .catch(console.warn)
  }

  componentDidMount() {
    this.fetchAdminUsers()
  }

  render() {
    return (
      <div>
        <AdminUserTable
          adminUsers={this.state.adminUsers}
          update={this.updateAdminUser}
          delete={this.deleteAdminUser}
        />
        <CreateWindow
          show={this.state.showAddWindow}
          onHide={this.closeAddWindow}
          create={this.createAdminUser}
        />
        <Navbar bg="info" variant="dark" fixed="bottom">
          <Navbar.Brand href="/admin" className="col-sm-6">
            <span className="fa fa-refresh fa-lg d-inline-block align-middle" onClick={this.fetchAdminUsers}>&nbsp;Refresh</span>
          </Navbar.Brand>
          <Navbar.Brand className="col-sm-6">
            <span className="fa fa-pencil fa-lg d-inline-block align-middle" onClick={this.openAddWindow}>&nbsp;Create</span>
          </Navbar.Brand>
        </Navbar>
      </div>
    )
  }
}

export default AdminUserContainer