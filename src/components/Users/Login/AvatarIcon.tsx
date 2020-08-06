import React, { useEffect, useState } from 'react'
import { Modal, Button, Nav, OverlayTrigger, Tooltip, Image, ListGroup } from 'react-bootstrap'
import avatar from '../../../icons/avatar.png'
import { ModalWindowPropsType } from '../../Types/CustomTypes'
import { RootStateType } from '../../../reducers/rootReducer'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { Logout } from '../../../reducers/login/actions'
import { decode } from 'jsonwebtoken'

const mapStateToProps = (state: RootStateType) => (
    {
        token: state.tokenState.token
    }
)

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        Logout
    },
    dispatch
)

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsTypeFromRedux = ConnectedProps<typeof connector> // inferred type

type TokenPayloadInfo = {
    id?: number | null,
    name?: string | null,
    email?: string | null,
    issuedAt?: string | null,
    expireAt?: string | null,
    issuer?: string | null
}

function AvatarWindow(props: ModalWindowPropsType & PropsTypeFromRedux) {

    const handleLogout = () => {
        props.onHide()
        props.Logout()
    }

    const [myDecodedTokenInfo, setMyDecodedTokenInfo] = useState<TokenPayloadInfo>({
        id: null,
        name: null,
        email: null,
        issuedAt: null,
        expireAt: null,
        issuer: null
    })

    useEffect(() => {
        const decodedToken: any = props.token ? decode(props.token, { complete: true }) : null
        // console.log(`My decoded token: ${JSON.stringify(decodedToken)}`)
        if (decodedToken.payload) {
            const { id, name, email, iat, exp, iss } = decodedToken.payload
            const decodedTokenInfo: TokenPayloadInfo = {
                id,
                name,
                email,
                issuedAt: new Date(iat * 1000).toLocaleString(),
                expireAt: new Date(exp * 1000).toLocaleString(),
                issuer: iss
            }
            setMyDecodedTokenInfo(decodedTokenInfo)
        }
    }, [props.token])

    const showMyDecodedTokenInfo = (
        <ListGroup>
            <ListGroup.Item variant="primary">Id:&nbsp;{myDecodedTokenInfo.id}</ListGroup.Item>
            <ListGroup.Item variant="info">Name:&nbsp;{myDecodedTokenInfo.name}</ListGroup.Item>
            <ListGroup.Item variant="primary">Email:&nbsp;{myDecodedTokenInfo.email}</ListGroup.Item>
            <ListGroup.Item variant="info">Token issued at:&nbsp;{myDecodedTokenInfo.issuedAt}</ListGroup.Item>
            <ListGroup.Item variant="primary">Token expire at:&nbsp;{myDecodedTokenInfo.expireAt}</ListGroup.Item>
            <ListGroup.Item variant="info">Issuer:&nbsp;{myDecodedTokenInfo.issuer}</ListGroup.Item>
        </ListGroup>
    )

    return (
        <React.Fragment>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                show={props.show}
                onHide={props.onHide}
            >
                <Modal.Header closeButton closeLabel="Close">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span className="fa fa-user-circle-o fa-lg text-primary">&nbsp;User Profile</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showMyDecodedTokenInfo}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleLogout}><span className="fa fa-sign-out fa-lg">&nbsp;Logout</span></Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment >
    )
}

const AvatarWindowConnected = connector(AvatarWindow)

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
            <AvatarWindowConnected
                show={avatarWindowShow}
                onHide={closeAvatarWindow}
            />
        </Nav.Link>
    )
}

export default AvatarIcon