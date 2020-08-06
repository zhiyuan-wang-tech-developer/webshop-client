import React, { useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Image, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import homeLogo from '../../icons/shoplogo.png'
import chatIcon from '../../icons/chat.png'
import LoginIcon from '../Users/Login/LoginIcon'
import AvatarIcon from '../Users/Login/AvatarIcon'
import ShoppingCartIcon from '../Users/ShoppingCart/Icon'
import { RootStateType } from '../../reducers/rootReducer'
import { connect, ConnectedProps, useDispatch } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { fetchCartItems, clearCart } from '../../reducers/cart/actions'

const mapStateToProps = (state: RootStateType) => (
    {
        token: state.tokenState.token
    }
)

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        fetchCartItems
    },
    dispatch
)

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsTypeFromRedux = ConnectedProps<typeof connector> // inferred type

function HomeNavBar(props: PropsTypeFromRedux) {

    const dispatch = useDispatch()

    const isLoggedIn = () => {
        return (props.token) ? true : false
    }

    const { token } = props

    useEffect(() => {
        if (isLoggedIn()) {
            // load shopping cart
            props.fetchCartItems()
        }
        else {
            // clear shopping cart only in react-redux store
            dispatch(clearCart())
        }
    }, [token])

    return (
        <Container>
            <Row>
                <Navbar fixed="top" bg="primary" variant="dark" expand="lg">
                    <Col sm={{ span: 1, offset: 0 }}>
                        <Navbar.Brand href="/home">
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="home-tooltip">Homepage</Tooltip>}
                            >
                                <Image
                                    src={homeLogo}
                                    alt="logo"
                                    height={50}
                                    rounded
                                    className="d-inline-block align-top img-fluid mx-auto float-left"
                                />
                            </OverlayTrigger>
                        </Navbar.Brand>
                    </Col>
                    <Col sm={{ span: 2, offset: 0 }} >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <NavDropdown title="Category" id="basic-nav-dropdown" style={{ color: "white", fontWeight: "bolder", fontSize: 30 }}>
                                    <NavDropdown.Item href="/category/books">Books</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/category/electronics">Electronics</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/category/transports">Transports</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col md={{ span: 5, offset: 0 }}>
                        <Form inline>
                            <FormControl type="text" placeholder="Search Product Here!" className="mr-sm-2" size="lg" style={{ width: "62%" }} />
                            <Button variant="outline-light" size="lg" style={{ fontWeight: "bolder" }}>Search</Button>
                        </Form>
                    </Col>
                    <Col sm={{ span: 2, offset: 0 }}>
                        {isLoggedIn() ? <ShoppingCartIcon /> : null}
                    </Col>
                    <Col sm={{ span: 1, offset: 0 }}>
                        {isLoggedIn() ?
                            (<Nav.Link href="/chat" >
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip id="chat-tooltip">Chat with customer service</Tooltip>}
                                >
                                    <Image
                                        src={chatIcon}
                                        alt="customer support"
                                        width={70}
                                        height={43}
                                        rounded
                                        className="d-inline-block align-top img-fluid mx-auto float-right"
                                    />
                                </OverlayTrigger>
                            </Nav.Link>) : null}
                    </Col>
                    <Col sm={{ span: 1, offset: 0 }}>
                        {isLoggedIn() ? <AvatarIcon /> : <LoginIcon />}
                    </Col>
                </Navbar>
            </Row>
        </Container>
    )
}

export default connector(HomeNavBar)