import React from 'react'
import { Button } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { TypedUseSelectorHook, useSelector, shallowEqual } from 'react-redux'
import { Item, AuthorityAction } from '../../../utils/app.types'
import { RootState } from '../../../reducer/root.reducer'
import { tableNameInventory } from '../../../constants/config'

type FindResultRecordProps = {
    item: Item
    update: (item: Item) => void,
    delete: VoidFunction
}

const FindResultRecord = (props: FindResultRecordProps) => {
    const { url } = useRouteMatch()

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
    const tableActions = useTypedSelector(state => state.tableActions, shallowEqual)

    const editShouldEnable = () => {
        const tableAction = tableActions.find(tableAction => tableAction.tableName === tableNameInventory)
        if (!tableAction) {
            return false
        }
        return tableAction.actions.includes(AuthorityAction.EDIT) || tableAction.actions.includes(AuthorityAction.ALL)
    }

    const deleteShouldEnable = () => {
        const tableAction = tableActions.find(tableAction => tableAction.tableName === tableNameInventory)
        if (!tableAction) {
            return false
        }
        return tableAction.actions.includes(AuthorityAction.DELETE) || tableAction.actions.includes(AuthorityAction.ALL)
    }

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
                        variant={editShouldEnable() ? "outline-primary" : "outline-secondary"}
                        href={`${url}/../edit/${props.item.id}`}
                        disabled={!editShouldEnable()}
                    >
                        <span className="fa fa-edit fa-lg"></span>
                    </Button>
                </td>
                <td>
                    <Button
                        variant={deleteShouldEnable() ? "outline-danger" : "outline-secondary"}
                        onClick={handleDeleteEvent}
                        disabled={!deleteShouldEnable()}
                    >
                        <span className="fa fa-trash-o fa-lg"></span>
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default FindResultRecord