import React from 'react'
import { Navbar, Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap'

export default function AdminNavBar() {
    return (
        <Container fluid>
            <Row>
                <Navbar bg="primary" variant="dark" fixed="top" expand="lg">
                    <Col sm={{ span: 0, offset: 0 }}>
                        <Navbar.Brand href="/">
                            <span className="fa fa-home fa-lg d-inline-block align-middle">&nbsp;Home</span>
                        </Navbar.Brand>
                    </Col>
                    <Col sm={{ span: 0, offset: 1 }}>
                        <DropdownButton id="dropdown-item-button" variant="info" title="Configuration">
                            <Dropdown.Item as="button" active>admin-users</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as="button">groups</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as="button">authorities</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col sm={{ span: 0, offset: 8 }}>
                        <Navbar.Brand href="/">
                            <span className="fa fa-sign-out fa-lg d-inline-block align-middle">&nbsp;Exit</span>
                        </Navbar.Brand>
                    </Col>
                </Navbar>
            </Row>
        </Container>
    )
}