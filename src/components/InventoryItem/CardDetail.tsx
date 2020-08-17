import React from 'react'
import { Item, ModalWindowProps } from '../../utils/appTypes'
import { Modal, Button, Image } from 'react-bootstrap'
import placeholderImage from '../../images/ItemCardPlaceholderImage.png'

type PropsType = {
    item: Item,
    addToMyCard: () => {}
} & ModalWindowProps

export default function ProductCardDetail(props: PropsType) {
    return (
        <React.Fragment>
            <Modal
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.show}
                onHide={props.onHide}
            >
                <Modal.Header closeButton closeLabel="Close">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <Image src={placeholderImage} rounded className="img-fluid mx-auto d-block"></Image>
                        <h2 className="text-black-50">{props.item.name}</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-info">
                    <h4>Description:</h4>
                    <h5>{props.item.description}</h5>
                    <h4>Price: <span className="fa fa-cny">{props.item.price}</span></h4>
                    <h4>Category: {props.item.category}</h4>
                    <h4>Status: {props.item.status}</h4>
                    <h4>Quantity in Stock: {props.item.quantityInStock}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.addToMyCard}>
                        <span className="fa fa-cart-plus fa-lg"> Add To Cart</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment >
    )
}