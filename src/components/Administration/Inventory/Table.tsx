import React from 'react'
import { Table, Container } from 'react-bootstrap'
import InventoryRecord from './Record'
import { Item } from '../../../utils/appTypes'
import { useSortableData } from '../../../utils/sortHook'
import { Button } from '@material-ui/core'

export const InventoryRecordExample: Item = {
    id: 1234,
    name: "item 1",
    description: "This paragraph is a product desciption.",
    category: "electronics",
    price: 198,
    status: "available",
    quantityInStock: 10
}

export default function InventoryTable(props: { items: Item[] }) {

    const { sortedItems, toggleSort } = useSortableData(props.items)

    const SortButton = (sortField: string, buttonName: string): JSX.Element => (
        <Button
            variant='contained'
            size='small'
            name={sortField}
            onClick={() => toggleSort(sortField)}
        >
            {buttonName}
        </Button>
    )

    return (
        <Container fluid style={{ paddingTop: 60 }}>
            <Table striped bordered hover variant="light" responsive>
                <thead>
                    <tr>
                        <th>
                            {SortButton('id', 'Id')}
                        </th>
                        <th>
                            {SortButton('name', 'Name')}
                        </th>
                        <th>
                            {SortButton('description', 'Description')}
                        </th>
                        <th>
                            {SortButton('category', 'Category')}
                        </th>
                        <th>
                            {SortButton('price', 'Unit Price')}
                        </th>
                        <th>
                            {SortButton('status', 'Status')}
                        </th>
                        <th>
                            {SortButton('quantityInStock', 'Stock Quantity')}
                        </th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {props.items.map((item, index) => (<InventoryRecord key={index} item={item} />))} */}
                    {sortedItems.map((item, index) => (<InventoryRecord key={index} item={item} />))}
                </tbody>
            </Table>
            {props.items.length > 0 ? null : <h4 className="align-middle">There are no items in inventory!</h4>}
            <br />
            <br />
        </Container>
    )
}

