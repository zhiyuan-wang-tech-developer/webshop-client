import React, { useState } from 'react'
import { Modal, Button, Nav, OverlayTrigger, Tooltip, Image } from 'react-bootstrap'
import loginIcon from '../../../icons/login.png'
import LoginForm from "./Form"
import RegisterForm from './Register'
import { ModalWindowPropsType } from '../../Types/CustomTypes'

enum FormType { Login = 1, Register = 2 }

function LoginWindow(props: ModalWindowPropsType) {
    const [formType, setFormType] = useState(FormType.Login)
    const switchToLoginForm = () => setFormType(FormType.Login)
    const switchToRegisterForm = () => setFormType(FormType.Register)
    return (
        <React.Fragment>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                {...props}
            >
                <Modal.Header closeButton closeLabel="Close">
                    <Modal.Title id="contained-modal-title-vcenter">
                        {formType === FormType.Login ? "LOG IN" : "REGISTER"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formType === FormType.Login ? <LoginForm switchForm={switchToRegisterForm} /> : <RegisterForm switchForm={switchToLoginForm} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

function LoginIcon() {
    const [loginWindowShow, setLoginWindowShow] = React.useState(false)
    const openLoginWindow = () => setLoginWindowShow(true)
    const closeLoginWindow = () => setLoginWindowShow(false)
    return (
        <Nav.Link>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="login-tooltip">Login/Register</Tooltip>}
            >
                <Image
                    src={loginIcon}
                    alt="login"
                    width={70}
                    height={43}
                    rounded
                    className="d-inline-block align-top img-fluid mx-auto float-right"
                    onClick={openLoginWindow}
                />
            </OverlayTrigger>
            <LoginWindow show={loginWindowShow} onHide={closeLoginWindow} />
        </Nav.Link>
    )
}

export default LoginIcon