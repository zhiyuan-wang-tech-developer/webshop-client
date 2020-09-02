import React, { Component } from "react"
import { Response, get, post, put, del } from 'superagent'
import { Navbar } from 'react-bootstrap'
import AdminUserTable from './Table'
import CreateWindow from './CreateWindow'
import { urlAdminUsers, urlAdminUser } from '../../../constants/config'
import { AdminUser } from "../../../utils/appTypes"
import { isSystemAdmin, getAdminUserIdFromCookies } from "../../../utils/helper"

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
    get(urlAdminUsers)
      .then((response: Response) => {
        const { adminUsers } = response.body
        if (!adminUsers) {
          throw new Error("Can not fetch admin users!");
        }
        this.setState({ adminUsers: [...adminUsers] })
      })
      .catch(console.warn)
  }

  fetchAdminUser = () => {
    const userId = getAdminUserIdFromCookies()
    if (userId) {
      get(urlAdminUser(userId))
        .then((response: Response) => {
          const { adminUser } = response.body
          if (!adminUser) {
            throw new Error(`Can not fetch admin user with id ${userId}!`);
          }
          this.setState({ adminUsers: [adminUser] })
        })
        .catch(console.warn)
    }
  }

  createAdminUser = (adminUser: AdminUser) => {
    post(urlAdminUsers)
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
    put(urlAdminUsers + `/${adminUser.id}`)
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
    del(urlAdminUsers + `/${adminUserId}`)
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

  loadAdminUserData = () => {
    if (isSystemAdmin()) {
      this.fetchAdminUsers()
    } else {
      this.fetchAdminUser()
    }
  }

  componentDidMount() {
    this.loadAdminUserData()
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
          <Navbar.Brand className="col-sm-6">
            <span className="fa fa-refresh fa-lg d-inline-block align-middle" onClick={this.loadAdminUserData.bind(this)}>&nbsp;Refresh</span>
          </Navbar.Brand>
          <Navbar.Brand className="col-sm-6">
            {isSystemAdmin() ? <span className="fa fa-pencil fa-lg d-inline-block align-middle" onClick={this.openAddWindow}>&nbsp;Create</span> : null}
          </Navbar.Brand>
        </Navbar>
      </div>
    )
  }
}

export default AdminUserContainer