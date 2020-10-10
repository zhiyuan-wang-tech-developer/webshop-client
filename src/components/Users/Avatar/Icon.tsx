import React from 'react'
import avatar from '../../../icons/avatar.png'
import { Nav, OverlayTrigger, Tooltip, Image } from 'react-bootstrap'
import AvatarWindow from './window'

function AvatarIcon() {
    const [avatarWindowShow, setAvatarWindowShow] = React.useState(false)
    const openAvatarWindow = () => setAvatarWindowShow(true)
    const closeAvatarWindow = () => setAvatarWindowShow(false)
    return (
        <Nav.Link>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="avatar-tooltip">Avatar</Tooltip>}
            >
                <Image
                    src={avatar}
                    alt="avatar"
                    width={70}
                    height={43}
                    rounded
                    className="d-inline-block align-top img-fluid mx-auto float-right"
                    onClick={openAvatarWindow}
                />
            </OverlayTrigger>
            <AvatarWindow
                show={avatarWindowShow}
                onHide={closeAvatarWindow}
            />
        </Nav.Link>
    )
}

export default AvatarIcon