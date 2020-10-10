import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ModalWindowProps } from '../../utils/app.types'
import { clearMyCart } from "../../actions/cart.actions";
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import ShoppingCartOrderList from './order.list'

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        clearMyCart
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

function ShoppingCartWindow(props: ModalWindowProps & PropsFromRedux) {
    const handlePay = () => {
        console.log("Pay your items!")
        handleClear()
    }

    const handleClear = () => {
        console.log("Clear your shopping cart!")
        props.clearMyCart()
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
                        Shopping List
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ShoppingCartOrderList />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handlePay}>Pay</Button>
                    <Button variant="outline-warning" onClick={handleClear}>Clear</Button>
                    &nbsp;&nbsp;
                    <Button variant="outline-secondary" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default connector(ShoppingCartWindow)