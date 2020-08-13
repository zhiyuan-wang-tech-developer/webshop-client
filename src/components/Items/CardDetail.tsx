import React from 'react'
import { Modal, Button, Image } from 'react-bootstrap'
import { ModalWindowPropsType, ItemType } from '../../utils/appTypes'
import placeholderImage from '../../images/ItemCardPlaceholderImage.png'
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

function ItemCardDetail(props: ModalWindowPropsType & { item: ItemType } & PropsFromRedux) {
    const addToCart = () => {
        props.addToMyCart(props.item.id)
    }

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
                    <Button variant="danger" onClick={addToCart}>
                        <span className="fa fa-cart-plus fa-lg"> Add To Cart</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment >
    )
}

export default connector(ItemCardDetail)
