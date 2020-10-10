import React, { Fragment } from 'react'
import { Table } from 'react-bootstrap'
import FindResultRecord from './find.result.record'
import { Item } from '../../../utils/app.types'

type FindResultsTableProps = {
    items: Item[],
    update: (item: Item) => void
    delete: (itemId: number) => void
    sortButton: (sortColumn: string, buttonName: string) => JSX.Element
}

export default function FindResultsTable(props: FindResultsTableProps) {
    return (
        <Fragment>
            <Table striped bordered hover variant="light" responsive>
                <thead>
                    <tr>
                        <th>{props.sortButton('id', 'Id')}</th>
                        <th>{props.sortButton('name', 'Name')}</th>
                        <th>{props.sortButton('description', 'Description')}</th>
                        <th>{props.sortButton('category', 'Category')}</th>
                        <th>{props.sortButton('price', 'Price')}&nbsp;&nbsp;&yen;</th>
                        <th>{props.sortButton('status', 'Status')}</th>
                        <th>{props.sortButton('quantityInStock', 'Stock Quantity')}</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item, index) => (
                        <FindResultRecord
                            key={index}
                            item={item}
                            update={props.update}
                            delete={() => props.delete(item.id)}
                        />))}
                </tbody>
            </Table>
            {props.items.length > 0 ? null : <h4 className="align-middle">We can not find any result!</h4>}
            <br />
            <br />
        </Fragment>
    )
}
