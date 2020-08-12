import React, { useState } from 'react'
import { Nav, OverlayTrigger, Tooltip, Badge, Image } from 'react-bootstrap'
import shoppingCartIcon from '../../icons/shoppingcart.png'
import ShoppingCartWindow from './Window'
import { RootStateType } from '../../reducers/rootReducer'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = (state: RootStateType) => (
    {
        items: state.cartState.items
    }
)

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector> // inferred type

function ShoppingCartIcon(props: PropsFromRedux) {
    const [shoppingCartWindowShow, setShoppingCartWindowShow] = useState(false)

    const openShoppingCartWindow = () => setShoppingCartWindowShow(true)
    const closeShoppingCartWindow = () => setShoppingCartWindowShow(false)

    return (
        <Nav.Link>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="shopping-cart-tooltip">Shopping Cart</Tooltip>}
            >
                <Image
                    src={shoppingCartIcon}
                    alt="shopping cart"
                    width={70}
                    height={43}
                    rounded
                    className="d-inline-block align-middle img-fluid mx-auto"
                    onClick={openShoppingCartWindow}
                />
            </OverlayTrigger>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="product-amount-tooltip">The amount of products in your shopping cart</Tooltip>}
            >
                <Badge pill variant="success" className="font-weight-bold align-middle" style={{ fontSize: 25 }}>{props.items.length}</Badge>
            </OverlayTrigger>
            <ShoppingCartWindow show={shoppingCartWindowShow} onHide={closeShoppingCartWindow} />
        </Nav.Link>
    )
}

export default connector(ShoppingCartIcon)