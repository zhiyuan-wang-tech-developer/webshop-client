import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
// import EditWindow from './EditWindow'
import { Item } from '../../../utils/appTypes'
import { InventoryUpdateContext } from '../AddInventory/UpdateContext'

type FindResultRecordProps = {
    item: Item
    update: (item: Item) => void,
    delete: VoidFunction
}

const FindResultRecord = (props: FindResultRecordProps) => {
    const [showEditWIndow, setShowEditWindow] = useState(false);
    const closeEditWindow = () => setShowEditWindow(false);
    // const openEditWindow = () => setShowEditWindow(true);
    const { url } = useRouteMatch()
    const { changeContext }: any = useContext(InventoryUpdateContext)

    const handleDeleteEvent = () => {
        props.delete()
    }

    return (
        <>
            <tr>
                <td>{props.item.id}</td>
                <td>{props.item.name}</td>
                <td>{props.item.description}</td>
                <td>{props.item.category}</td>
                <td>{props.item.price}</td>
                <td>{props.item.status}</td>
                <td>{props.item.quantityInStock}</td>
                <td>
                    <Button
                        variant="outline-primary"
                        // href={`${url}/../edit/${props.item.id}`}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            changeContext('update', props.item.id, `${url}/../edit/${props.item.id}`)
                        }}
                    >
                        <span className="fa fa-edit fa-lg"></span>
                    </Button>
                </td>
                <td>
                    <Button variant="outline-danger" onClick={handleDeleteEvent}>
                        <span className="fa fa-trash-o fa-lg"></span>
                    </Button>
                </td>
            </tr>
            {/* <EditWindow
                show={showEditWIndow}
                onHide={closeEditWindow}
                item={props.item}
                update={props.update}
            /> */}
        </>
    )
}

export default FindResultRecord