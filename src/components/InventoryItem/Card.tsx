import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import placeholderImage from '../../images/ItemCardPlaceholderImage.png'
import ProductCardDetail from './CardDetail'
import { Item } from '../../utils/appTypes'

type PropsType = {
    item: Item,
    addToMyCart: () => {}
}

export default function ProductCard(props: PropsType) {
    const [showCardDetail, setShowCardDetail] = useState(false)

    const openCardDetail = () => setShowCardDetail(true)
    const closeCardDetail = () => setShowCardDetail(false)

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
                        onClick={props.addToMyCart}
                    >
                        <span className="fa fa-cart-arrow-down fa-lg">&nbsp;&nbsp;Add To Cart</span>
                    </Button>
                </Card.Body>
            </Card>
            <ProductCardDetail show={showCardDetail} onHide={closeCardDetail} item={props.item} addToMyCard={props.addToMyCart} />
        </React.Fragment>
    )
}