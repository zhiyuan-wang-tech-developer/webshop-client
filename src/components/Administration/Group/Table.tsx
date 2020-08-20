import React from 'react'
import { Table, Container } from 'react-bootstrap'
import GroupRecord from './Record'
import { Group } from '../../../utils/appTypes'

type GroupTableProps = {
    groups: Group[],
    update: (group: Group) => void
    delete: (groupId: number) => void
}

export default function GroupTable(props: GroupTableProps) {
    return (
        <Container fluid style={{ paddingTop: 60 }}>
            <Table striped bordered hover variant="light" responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.groups.map((group, index) => (
                        <GroupRecord
                            key={index}
                            group={group}
                            update={props.update}
                            delete={props.delete}
                        />
                    ))}
                </tbody>
            </Table>
            {props.groups.length > 0 ? null : <h4 className="align-middle">No group in database!</h4>}
            <br />
            <br />
        </Container>
    )
}