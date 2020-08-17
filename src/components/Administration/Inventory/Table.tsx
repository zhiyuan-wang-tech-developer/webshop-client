import React from 'react'
import { Table, Container } from 'react-bootstrap'
import InventoryRecord from './Record'
import { Item } from '../../../utils/appTypes'

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
    console.log(props.items)
    return (
        <Container fluid style={{ paddingTop: 60 }}>
            <Table striped bordered hover variant="light" responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Unit Price</th>
                        <th>Status</th>
                        <th>Quantity In Stock</th>
                        <th>Modify</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item, index) => (<InventoryRecord key={index} item={item} />))}
                </tbody>
            </Table>
            {props.items.length > 0 ? null : <h4 className="align-middle">There are no items in inventory!</h4>}
            <br />
            <br />
        </Container>
    )
}

