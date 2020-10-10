import React, { Component } from "react"
import { Response, get, post, put, del } from 'superagent'
import { Navbar } from 'react-bootstrap'
import GroupTable from './table'
import OperateWindow from './operate.window'
import { urlAdminGroups } from '../../../constants/config'
import { Group } from "../../../utils/app.types"

type GroupContainerState = {
  groups: Group[],
  showCreateWindow: boolean
}

class GroupContainer extends Component<any, GroupContainerState> {
  state: GroupContainerState = {
    groups: [],
    showCreateWindow: false
  }

  openCreateWindow = () => { this.setState({ showCreateWindow: true }) };
  closeCreateWindow = () => { this.setState({ showCreateWindow: false }) };

  fetchGroups = () => {
    get(urlAdminGroups)
      .send()
      .then((response: Response) => {
        const { groups } = response.body
        if (!groups) {
          throw new Error("Can not fetch groups!");
        }
        this.setState({ groups })
      })
      .catch(console.warn)
  }

  createGroup = (group: Group) => {
    post(urlAdminGroups)
      .send(group)
      .then((response: Response) => {
        const { createdGroup } = response.body
        if (!createdGroup) {
          throw new Error("Can not get the created group!");
        }
        const updatedGroups = [...this.state.groups, createdGroup]
        updatedGroups.sort((groupA, groupB) => groupA.id - groupB.id)
        this.setState({ groups: updatedGroups })
      })
      .catch(console.warn)
  }

  updateGroup = (group: Group) => {
    put(urlAdminGroups + `/${group.id}`)
      .send(group)
      .then((response: Response) => {
        const { updatedGroup } = response.body
        if (!updatedGroup) {
          throw new Error("Can not get the updated group!");
        }
        const updatedGroups = this.state.groups.map(group => {
          if (group.id !== updatedGroup.id)
            return group
          else
            return updatedGroup
        })
        this.setState({ groups: updatedGroups })
      })
      .catch(console.warn)
  }

  deleteGroup = (groupId: number) => {
    del(urlAdminGroups + `/${groupId}`)
      .send()
      .then((response: Response) => {
        const { groupIsDeleted } = response.body
        if (!groupIsDeleted) {
          throw new Error("Can not delete the group!");
        }
        const updatedGroups = this.state.groups.filter(group => group.id !== groupId)
        this.setState({ groups: updatedGroups })
      })
      .catch(console.warn)
  }

  componentDidMount() {
    this.fetchGroups()
  }

  render() {
    return (
      <div>
        <GroupTable
          groups={this.state.groups}
          update={this.updateGroup}
          delete={this.deleteGroup}
        />
        <OperateWindow
          show={this.state.showCreateWindow}
          onHide={this.closeCreateWindow}
          operate={this.createGroup}
        />
        <Navbar bg="info" variant="dark" fixed="bottom">
          <Navbar.Brand className="col-sm-6" onClick={this.fetchGroups}>
            <span className="fa fa-refresh fa-lg d-inline-block align-middle" >&nbsp;Refresh</span>
          </Navbar.Brand>
          <Navbar.Brand className="col-sm-6" onClick={this.openCreateWindow}>
            <span className="fa fa-pencil fa-lg d-inline-block align-middle" >&nbsp;Create</span>
          </Navbar.Brand>
        </Navbar>
      </div>
    )
  }
}

export default GroupContainer