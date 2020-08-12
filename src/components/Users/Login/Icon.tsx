import React from "react"
import { Nav, OverlayTrigger, Tooltip, Image } from 'react-bootstrap'
import LoginWindow from './Window'
import loginIcon from '../../../icons/login.png'

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