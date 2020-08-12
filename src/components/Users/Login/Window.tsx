import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import LoginForm from "./Form"
import RegisterForm from './Register'
import { ModalWindowPropsType } from '../../../utils/customTypes'

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

export default LoginWindow