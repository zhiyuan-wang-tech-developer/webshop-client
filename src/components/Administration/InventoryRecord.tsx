import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import ModifyWindow from './ModifyWIndow'
import { ItemType } from '../../utils/customTypes'
import { deleteItem } from "../../actions/inventoryActions"
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        deleteItem
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type InventoryRecordPropsType = { item: ItemType } & PropsFromRedux

const InventoryRecord = (props: InventoryRecordPropsType) => {
    const [showModifyWIndow, setShowModifyWindow] = useState(false);

    const closeModifyWindow = () => setShowModifyWindow(false);
    const openModifyWindow = () => setShowModifyWindow(true);

    const handleDelete = () => {
        props.deleteItem(props.item.id)
    }

    return (
        <>
            <tr>
                <td>{props.item.id}</td>
                <td>{props.item.name}</td>
                <td>{props.item.description}</td>
                <td>{props.item.category}</td>
                <td>&yen;&nbsp;{props.item.price}</td>
                <td>{props.item.status}</td>
                <td>{props.item.quantityInStock}</td>
                <td>
                    <Button variant="outline-primary" onClick={openModifyWindow}>
                        <span className="fa fa-edit fa-lg"></span>
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Button variant="outline-danger" onClick={handleDelete}>
                        <span className="fa fa-trash-o fa-lg"></span>
                    </Button>
                </td>
            </tr>
            <ModifyWindow show={showModifyWIndow} onHide={closeModifyWindow} item={props.item} />
        </>
    )
}

export default connector(InventoryRecord)
