import React from 'react'
import { Navbar, Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { TypedUseSelectorHook, useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { AuthorityAction } from '../../utils/appTypes'
import { tableNameInventory, tableNameShoppingCart } from '../../constants/config'
import { isSystemAdmin } from '../../utils/helper'

export default function AdminNavBar() {
    const { url } = useRouteMatch()

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
    const tableActions = useTypedSelector(state => state.tableActions, shallowEqual)

    const shouldEnable = (thisTableName: string, thisTableAction: AuthorityAction): boolean => {
        const tableAction = tableActions.find(tableAction => tableAction.tableName === thisTableName)
        if (!tableAction) {
            return false
        }
        return tableAction.actions.includes(thisTableAction) || tableAction.actions.includes(AuthorityAction.ALL)
    }

    return (
        <Container fluid>
            <Row>
                <Navbar bg="primary" variant="dark" fixed="top" expand="lg">
                    <Col lg={{ span: 3, offset: 0 }}>
                        <Navbar.Brand href="/">
                            <span className="fa fa-home fa-lg d-inline-block align-middle">&nbsp;Home</span>
                        </Navbar.Brand>
                    </Col>
                    <Col lg={{ span: 2, offset: 0 }}>
                        <DropdownButton id="dropdown-item-button" variant="success" title="Inventory">
                            <Dropdown.Item
                                href={`${url}/inventory/add`}
                                // disabled={!addInventoryShouldEnable()}
                                disabled={!shouldEnable(tableNameInventory, AuthorityAction.ADD)}
                            >Add a new item</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                href={`${url}/inventory/find`}
                                // disabled={!getInventoryShouldEnable()}
                                disabled={!shouldEnable(tableNameInventory, AuthorityAction.GET)}
                            >Find items</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col lg={{ span: 2, offset: 0 }}>
                        <DropdownButton id="dropdown-item-button" variant="success" title="Shopping Cart">
                            <Dropdown.Item
                                href={`${url}/shoppingcart/find`}
                                // disabled={!getCartShouldEnable()}
                                disabled={!shouldEnable(tableNameShoppingCart, AuthorityAction.GET)}
                            >Find a cart</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col lg={{ span: 2, offset: 0 }}>
                        <DropdownButton id="dropdown-item-button" variant="success" title="Configuration">
                            <Dropdown.Item href={`${url}/admin-users`}>admin-users</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                href={`${url}/groups`}
                                disabled={!isSystemAdmin()}
                            >groups</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                href={`${url}/authorities`}
                                disabled={!isSystemAdmin()}
                            >authorities</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href={`${url}/products`}>products</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col lg={{ span: 3, offset: 0 }}>
                        <Navbar.Brand href="/">
                            <span className="fa fa-sign-out fa-lg d-inline-block align-middle">&nbsp;Exit</span>
                        </Navbar.Brand>
                    </Col>
                </Navbar>
            </Row>
        </Container>
    )
}