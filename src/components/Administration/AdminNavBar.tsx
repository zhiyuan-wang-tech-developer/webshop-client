import React, { useContext } from 'react'
import { Navbar, Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { InventoryUpdateContext } from './AddInventory/UpdateContext'

export default function AdminNavBar() {
    const { url } = useRouteMatch()
    const { changeContext }: any = useContext(InventoryUpdateContext)
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
                                // href={`${url}/inventory/add`}
                                onClick={() => {
                                    changeContext('add', null, `${url}/inventory/add`)
                                }}
                            >Add a new item</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href={`${url}/inventory/find`}>Find items</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col lg={{ span: 2, offset: 0 }}>
                        <DropdownButton id="dropdown-item-button" variant="success" title="Shopping Cart">
                            <Dropdown.Item href={`${url}/shoppingcart/find`}>Find a cart</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col lg={{ span: 2, offset: 0 }}>
                        <DropdownButton id="dropdown-item-button" variant="success" title="Configuration">
                            <Dropdown.Item href={`${url}/admin-users`}>admin-users</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href={`${url}/groups`}>groups</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href={`${url}/authorities`}>authorities</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href={`${url}/inventory`}>inventory</Dropdown.Item>
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