import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { ItemOrderType } from '../../utils/customTypes'
import { RootStateType } from '../../reducers/rootReducer'
import { removeFromMyCart, incrementAmountInMyCart, decrementAmountInMyCart } from '../../actions/cartActions'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'

const mapStateToProps = (state: RootStateType) => (
    {
        items: state.cartState.items
    }
)

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        removeFromMyCart,
        incrementAmountInMyCart,
        decrementAmountInMyCart
    },
    dispatch
)

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector> // inferred type

class ShoppingCartOrderList extends Component<PropsFromRedux> {
    render() {
        return (
            <Table striped bordered hover variant="light" size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.items.map((item: ItemOrderType, index) =>
                            <ShoppingCartItemOrder
                                key={index}
                                item={item}
                                increment={() => this.props.incrementAmountInMyCart(item)}
                                decrement={() => this.props.decrementAmountInMyCart(item)}
                                delete={() => this.props.removeFromMyCart(item.id)}
                            />
                        )
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-danger font-weight-bolder lead">
                            &yen;&nbsp;{this.props.items
                                .map((item: ItemOrderType) => item.totalPrice)
                                .reduce((accumulator: number, value: number) => (accumulator + value), 0)}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default connector(ShoppingCartOrderList)

type ItemOrderPropsType = {
    item: ItemOrderType,
    increment: VoidFunction,
    decrement: VoidFunction,
    delete: VoidFunction
}

function ShoppingCartItemOrder(props: ItemOrderPropsType) {
    return (
        <tr>
            <td>{props.item.id}</td>
            <td>{props.item.name}</td>
            <td>&yen;&nbsp;{props.item.unitPrice}</td>
            <td>
                <Button variant="primary" size="sm" onClick={props.increment}>
                    <span className="fa fa-plus-square fa-lg"></span>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {props.item.amount}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="primary" size="sm" onClick={props.decrement}>
                    <span className="fa fa-minus-square fa-lg"></span>
                </Button>
            </td>
            <td>&yen;&nbsp;{props.item.totalPrice}</td>
            <td>
                <Button variant="danger" size="sm" onClick={props.delete}>
                    <span className="fa fa-trash-o fa-lg"></span>
                </Button>
            </td>
        </tr>
    )
}