import React, { Component, ChangeEvent } from 'react'
import { Container, Form, Col } from 'react-bootstrap'
import { Response, get, post, del } from 'superagent'
// import { ApolloClient, InMemoryCache, gql, FetchResult } from '@apollo/client'
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { ConnectedProps, connect } from 'react-redux'
import { urlAdminGroups, urlTables, urlActions, urlAuthorities } from '../../../constants/config'
import { Group, Table, Authority, AuthorityAction } from '../../../utils/appTypes'
import { getTableActionsByAdminUser } from '../../../actions/loginAdminActions'

type AuthorityContainerState = {
    groups: Group[],
    tables: Table[],
    authority: Authority,
    checked: {
        [AuthorityAction.ALL]: boolean,
        [AuthorityAction.GET]: boolean,
        [AuthorityAction.ADD]: boolean,
        [AuthorityAction.EDIT]: boolean,
        [AuthorityAction.DELETE]: boolean
    },
    disableOthers: boolean
}

// const client = new ApolloClient({
//     uri: urlBaseGraphQL,
//     cache: new InMemoryCache()
// })

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        getTableActionsByAdminUser
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

class AuthorityContainer extends Component<PropsFromRedux, AuthorityContainerState> {
    state: AuthorityContainerState = {
        groups: [],
        tables: [],
        authority: {
            groupId: -1,
            tableId: -1,
            action: AuthorityAction.GET
        },
        checked: {
            [AuthorityAction.ALL]: false,
            [AuthorityAction.GET]: false,
            [AuthorityAction.ADD]: false,
            [AuthorityAction.EDIT]: false,
            [AuthorityAction.DELETE]: false
        },
        disableOthers: false
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
        get(urlTables)
            .send()
            .then((response: Response) => {
                const { tables } = response.body
                if (!tables) {
                    throw new Error("Can not fetch tables!");
                }
                this.setState({
                    tables
                })
            })
            .catch(console.error)
    }

    // getTables = () => {
    //     client
    //         .query({
    //             query: gql(`query { tables { id name description } }`)
    //         })
    //         .then((result: FetchResult) => {
    //             const { errors, data } = result
    //             if (errors) {
    //                 throw new Error(JSON.stringify(errors))
    //             }
    //             if (data) {
    //                 const { tables } = data
    //                 this.setState({
    //                     tables
    //                 })
    //             }
    //         })
    //         .catch(console.error)
    // }

    operateAuthority = (operate: string, authority: Authority) => {
        // console.log(`To ${operate} authority:\n` + JSON.stringify(authority, null, 2))
        const { groupId, tableId, action } = authority
        switch (operate) {
            case "create":
                post(urlAuthorities)
                    .send({
                        groupId,
                        tableId,
                        action
                    })
                    .then((response: Response) => {
                        const { createdAuthority } = response.body
                        if (!createdAuthority) {
                            throw new Error("Can not create authority!");
                        }
                        // console.log("Created authority: ", JSON.stringify(createdAuthority))
                    })
                    .then(() => {
                        // First post authority then get actions, they are async operations. 
                        this.updateCheckboxs()
                    })
                    .catch(console.error)
                break;

            case "delete":
                del(urlAuthorities)
                    .send({
                        groupId,
                        tableId,
                        action
                    })
                    .then((response: Response) => {
                        const { isAuthorityDeleted } = response.body
                        if (!isAuthorityDeleted) {
                            throw new Error("Can not delete authority!");
                        }
                        // console.log("Is authority deleted? ", isAuthorityDeleted)
                    })
                    .then(() => {
                        // First delete authority then get actions, they are async operations. 
                        this.updateCheckboxs()
                    })
                    .catch(console.error)
                break;

            default:
                break;
        }
    }

    // operateAuthority = (operate: string, authority: Authority) => {
    //     console.log(`To ${operate} authority:\n` + JSON.stringify(authority, null, 2))
    //     switch (operate) {
    //         case "create":
    //             client
    //                 .mutate({
    //                     mutation: gql(`
    //                         mutation authorityCreate($groupId: Int, $tableId: Int, $action: String) {
    //                             authorityCreate(groupId: $groupId, tableId: $tableId, action: $action) {id, groupId, tableId, action }
    //                         }`),
    //                     variables: {
    //                         groupId: authority.groupId,
    //                         tableId: authority.tableId,
    //                         action: authority.action
    //                     }
    //                 })
    //                 .then((result: FetchResult) => {
    //                     const { errors, data } = result
    //                     if (errors) {
    //                         throw new Error(JSON.stringify(errors));
    //                     }
    //                     if (data) {
    //                         const { authorityCreate } = data
    //                         console.log(JSON.stringify(authorityCreate))
    //                     }
    //                 })
    //                 .catch(console.error)
    //             break;

    //         case "delete":
    //             client
    //                 .mutate({
    //                     mutation: gql(`
    //                         mutation authorityDelete($groupId: Int, $tableId: Int, $action: String) {
    //                             authorityDelete(groupId: $groupId, tableId: $tableId, action: $action)
    //                         }`),
    //                     variables: {
    //                         groupId: authority.groupId,
    //                         tableId: authority.tableId,
    //                         action: authority.action
    //                     }
    //                 })
    //                 .then((result: FetchResult) => {
    //                     const { errors, data } = result
    //                     if (errors) {
    //                         throw new Error(JSON.stringify(errors));
    //                     }
    //                     if (data) {
    //                         const { authorityDelete } = data
    //                         console.log(JSON.stringify(authorityDelete))
    //                     }
    //                 })
    //                 .catch(console.error)
    //             break;

    //         default:
    //             break;
    //     }
    // }

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

    updateCheckboxs = () => {
        if (this.bothGroupAndTableSelected()) {
            const { groupId, tableId } = this.state.authority
            get(urlActions(groupId, tableId))
                .send()
                .then((response: Response) => {
                    const { actions } = response.body
                    if (!actions) {
                        throw new Error("Can not fetch actions!");
                    }
                    console.log("GET ACTIONS = ", JSON.stringify(actions))
                    // clear checkboxs
                    this.setState({
                        checked: {
                            [AuthorityAction.ALL]: false,
                            [AuthorityAction.GET]: false,
                            [AuthorityAction.ADD]: false,
                            [AuthorityAction.EDIT]: false,
                            [AuthorityAction.DELETE]: false
                        },
                        disableOthers: false
                    }, () => {
                        let stateChecked: any = {}
                        let disableOthers: boolean = false
                        actions.forEach((action: string) => {
                            switch (action) {
                                case AuthorityAction.ALL:
                                    stateChecked[AuthorityAction.ALL] = true
                                    disableOthers = true
                                    break;

                                case AuthorityAction.GET:
                                case AuthorityAction.ADD:
                                case AuthorityAction.EDIT:
                                case AuthorityAction.DELETE:
                                    stateChecked[action] = true
                                    break;

                                default:
                                    break;
                            }
                        })
                        // NOTE: set component state at last to solve async state update problem.
                        this.setState({
                            checked: { ...this.state.checked, ...stateChecked },
                            disableOthers
                        })
                        // update client's table actions after changing actions
                        this.props.getTableActionsByAdminUser(3)
                    })
                })
                .catch(console.error)
        }
    }

    // updateCheckboxs = () => {
    //     if (this.bothGroupAndTableSelected()) {
    //         client
    //             .query({
    //                 query: gql(`query actions($groupId: Int, $tableId: Int) { 
    //                     actions(groupId: $groupId, tableId: $tableId) 
    //                 }`),
    //                 variables: {
    //                     groupId: this.state.authority.groupId,
    //                     tableId: this.state.authority.tableId
    //                 }
    //             })
    //             .then((result: FetchResult) => {
    //                 const { errors, data } = result
    //                 if (errors) {
    //                     throw new Error(JSON.stringify(errors));
    //                 }
    //                 if (data) {
    //                     const { actions } = data
    //                     console.log(JSON.stringify(actions))
    //                     this.setState({
    //                         checked: {
    //                             [AuthorityAction.ALL]: false,
    //                             [AuthorityAction.ADD]: false,
    //                             [AuthorityAction.GET]: false,
    //                             [AuthorityAction.EDIT]: false,
    //                             [AuthorityAction.DELETE]: false
    //                         }
    //                     })
    //                     actions.forEach((action: string) => {
    //                         switch (action) {
    //                             case AuthorityAction.ALL:
    //                                 this.setState({ checked: { ...this.state.checked, [AuthorityAction.ALL]: true } })
    //                                 break;
    //                             case AuthorityAction.ADD:
    //                                 this.setState({ checked: { ...this.state.checked, [AuthorityAction.ADD]: true } })
    //                                 break;
    //                             case AuthorityAction.GET:
    //                                 this.setState({ checked: { ...this.state.checked, [AuthorityAction.GET]: true } })
    //                                 break;
    //                             case AuthorityAction.EDIT:
    //                                 this.setState({ checked: { ...this.state.checked, [AuthorityAction.EDIT]: true } })
    //                                 break;
    //                             case AuthorityAction.DELETE:
    //                                 this.setState({ checked: { ...this.state.checked, [AuthorityAction.DELETE]: true } })
    //                                 break;
    //                             default:
    //                                 break;
    //                         }
    //                     });
    //                 }
    //             })
    //             .catch(console.error)
    //     }
    // }

    selectGroup = (event: ChangeEvent) => {
        event.stopPropagation()
        const { value: groupId } = event.currentTarget as HTMLOptionElement
        this.setState({ authority: { ...this.state.authority, groupId: parseInt(groupId) } }, this.updateCheckboxs)
    }

    selectTable = (event: ChangeEvent) => {
        event.stopPropagation()
        const { value: tableId } = event.currentTarget as HTMLOptionElement
        this.setState({ authority: { ...this.state.authority, tableId: parseInt(tableId) } }, this.updateCheckboxs)
    }

    selectAction = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation()
        const { name: action, checked } = event.target
        console.log(action, checked)
        this.setState({
            authority: { ...this.state.authority, action }
        }, () => {
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

    checkboxShouldDisable = () => {
        return this.state.disableOthers || !this.bothGroupAndTableSelected()
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
                </Form>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Actions</FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                            label="All"
                            control={
                                <Checkbox
                                    color="primary"
                                    name={AuthorityAction.ALL}
                                    checked={this.state.checked.all}
                                    onChange={this.selectAction}
                                    disabled={!this.bothGroupAndTableSelected()}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Get"
                            control={
                                <Checkbox
                                    color="primary"
                                    name={AuthorityAction.GET}
                                    checked={this.state.checked.get}
                                    onChange={this.selectAction}
                                    disabled={this.checkboxShouldDisable()}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Add"
                            control={
                                <Checkbox
                                    color="primary"
                                    name={AuthorityAction.ADD}
                                    checked={this.state.checked.add}
                                    onChange={this.selectAction}
                                    disabled={this.checkboxShouldDisable()}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Edit"
                            control={
                                <Checkbox
                                    color="primary"
                                    name={AuthorityAction.EDIT}
                                    checked={this.state.checked.edit}
                                    onChange={this.selectAction}
                                    disabled={this.checkboxShouldDisable()}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Delete"
                            control={
                                <Checkbox
                                    color="primary"
                                    name={AuthorityAction.DELETE}
                                    checked={this.state.checked.delete}
                                    onChange={this.selectAction}
                                    disabled={this.checkboxShouldDisable()}
                                />
                            }
                        />
                    </FormGroup>
                    <FormHelperText>Choose your actions!</FormHelperText>
                </FormControl>
            </Container>
        )
    }
}

export default connector(AuthorityContainer)