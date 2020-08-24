import React from 'react'
import { Table, Container } from 'react-bootstrap'
import FindResultRecord from './FindResultRecord'
import { Item } from '../../../utils/appTypes'

type FindResultsTableProps = {
    items: Item[],
    update: (item: Item) => void
    delete: (itemId: number) => void
}

export default function FindResultsTable(props: FindResultsTableProps) {
    return (
        <Container fluid style={{ paddingTop: 25 }}>
            <Table striped bordered hover variant="light" responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price&nbsp;&nbsp;&yen;</th>
                        <th>Status</th>
                        <th>Quantity In Stock</th>
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
        </Container>
    )
}

