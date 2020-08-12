import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import placeholderImage from '../../images/ItemCardPlaceholderImage.png'
import ItemCardDetail from './CardDetail'
import { ItemType } from '../../utils/customTypes'
import { addToMyCart } from '../../actions/cartActions'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        addToMyCart
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

function ItemCard(props: { item: ItemType } & PropsFromRedux) {
    const [showCardDetail, setShowCardDetail] = useState(false)

    const openCardDetail = () => setShowCardDetail(true)
    const closeCardDetail = () => setShowCardDetail(false)

    const addToCart = () => {
        props.addToMyCart(props.item.id)
    }

    return (
        <React.Fragment>
            <Card style={{ padding: 10 }} border="primary" text="primary">
                <Card.Img variant="top" src={placeholderImage} onClick={openCardDetail} />
                <Card.Body>
                    <Card.Title>{props.item.name}</Card.Title>
                    <Card.Text>
                        <span>{props.item.description}</span>
                        <br />
                        &yen;&nbsp;{props.item.price}
                    </Card.Text>
                    <Button
                        variant="danger"
                        onClick={addToCart}
                    >
                        <span className="fa fa-cart-arrow-down fa-lg">&nbsp;&nbsp;Add To Cart</span>
                    </Button>
                </Card.Body>
            </Card>
            <ItemCardDetail show={showCardDetail} onHide={closeCardDetail} item={props.item} />
        </React.Fragment>
    )
}

export default connector(ItemCard)