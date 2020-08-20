import React, { Component, ChangeEvent } from 'react'
import { Container, Form, Col } from 'react-bootstrap'
import { Response, get } from 'superagent'
import { urlAdminGroups } from '../../../constants/config'
import { Group, Table, Authority, AuthorityAction } from '../../../utils/appTypes'

type AuthorityContainerState = {
    groups: Group[],
    tables: Table[],
    authority: Authority,
    disableAll: boolean
}

class AuthorityContainer extends Component<any, AuthorityContainerState> {
    state: AuthorityContainerState = {
        groups: [],
        tables: [],
        authority: {
            groupId: -1,
            tableId: -1,
            action: AuthorityAction.GET
        },
        disableAll: false
    }

    componentDidMount() {
        this.getGroups()
        this.getTables()
    }

    getGroups = () => {
        get(urlAdminGroups)
            .send()
            .then((response: Response) => {
                const { groups } = response.body
                if (!groups) {
                    throw new Error("Can not fetch groups!");
                }
                this.setState({ groups: groups.sort((groupA: any, groupB: any) => groupA.id - groupB.id) })
            })
            .catch(console.warn)
    }

    getTables = () => {
        this.setState({
            tables: [
                {
                    id: 1,
                    name: "inventory",
                    description: "inventory table"
                }
            ]
        })
    }

    operateAuthority = (operate: string, authority: Authority) => {
        switch (operate) {
            case "create":
            case "delete":
                console.log(`To ${operate} authority:\n` + JSON.stringify(authority, null, 2))
                break;

            default:
                break;
        }
    }

    GroupOptionsList = () => {
        return this.state.groups.map((group, index) => {
            return (
                <option key={index} value={group.id}>{group.name}</option>
            )
        })
    }

    TableOptionsList = () => {
        return this.state.tables.map((table, index) => {
            return (
                <option key={index} value={table.id}>{table.name}</option>
            )
        })
    }

    selectGroup = (event: ChangeEvent) => {
        event.stopPropagation()
        const { value: groupId } = event.currentTarget as HTMLOptionElement
        this.setState({ authority: { ...this.state.authority, groupId: parseInt(groupId) } })
    }

    selectTable = (event: ChangeEvent) => {
        event.stopPropagation()
        const { value: tableId } = event.currentTarget as HTMLOptionElement
        this.setState({ authority: { ...this.state.authority, tableId: parseInt(tableId) } })
    }

    selectAction = (event: ChangeEvent) => {
        event.stopPropagation()
        const { checked, value: action } = event.currentTarget as HTMLInputElement
        // TODO: check the event.preventDefault()
        if (action === AuthorityAction.ALL) {
            this.setState({ disableAll: checked })
        }
        this.setState({ authority: { ...this.state.authority, action } }, () => {
            if (checked) {
                this.operateAuthority("create", this.state.authority)
            }
            else {
                this.operateAuthority("delete", this.state.authority)
            }
        })
    }

    bothGroupAndTableSelected = () => {
        return (this.state.authority.groupId >= 0 && this.state.authority.tableId >= 0)
    }

    shouldCheckboxDisable() {
        return this.state.disableAll || !this.bothGroupAndTableSelected()
    }

    render() {
        return (
            <Container fluid style={{ paddingTop: 100 }}>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="selectGroup">Group</Form.Label>
                            <Form.Control id="selectGroup" as="select" multiple onChange={this.selectGroup}>
                                {this.GroupOptionsList()}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="selectTable">Table</Form.Label>
                            <Form.Control id="selectTable" as="select" multiple onChange={this.selectTable}>
                                {this.TableOptionsList()}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <br />
                    <br />
                    <Col sm={{ span: 2, offset: 0 }}>
                        <Form.Group controlId="checkAll" >
                            <Form.Check
                                label="All"
                                type="checkbox"
                                value={AuthorityAction.ALL}
                                onChange={this.selectAction}
                                disabled={!this.bothGroupAndTableSelected()}
                            />
                        </Form.Group>
                        <Form.Group controlId="checkGet">
                            <Form.Check
                                label="Get"
                                type="checkbox"
                                value={AuthorityAction.GET}
                                disabled={this.shouldCheckboxDisable()}
                                onChange={this.selectAction}
                            />
                        </Form.Group>
                        <Form.Group controlId="checkAdd" >
                            <Form.Check
                                label="Add"
                                type="checkbox"
                                value={AuthorityAction.ADD}
                                disabled={this.shouldCheckboxDisable()}
                                onChange={this.selectAction}
                            />
                        </Form.Group>
                        <Form.Group controlId="checkEdit">
                            <Form.Check
                                label="Edit"
                                type="checkbox"
                                value={AuthorityAction.EDIT}
                                disabled={this.shouldCheckboxDisable()}
                                onChange={this.selectAction}
                            />
                        </Form.Group>
                        <Form.Group controlId="checkDelete">
                            <Form.Check
                                label="Delete"
                                type="checkbox"
                                value={AuthorityAction.DELETE}
                                disabled={this.shouldCheckboxDisable()}
                                onChange={this.selectAction}
                            />
                        </Form.Group>
                    </Col>
                </Form>
            </Container >
        )
    }
}

export default AuthorityContainer