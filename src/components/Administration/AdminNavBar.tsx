import React from 'react'
import { Navbar, Container, Col, Row } from 'react-bootstrap'

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
                    <Col sm={{ span: 0, offset: 10 }}>
                        <Navbar.Brand href="/">
                            <span className="fa fa-sign-out fa-lg d-inline-block align-middle">&nbsp;Exit</span>
                        </Navbar.Brand>
                    </Col>
                </Navbar>
            </Row>
        </Container>
    )
}