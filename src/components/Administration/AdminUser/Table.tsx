import React from 'react'
import { Table, Container } from 'react-bootstrap'
import AdminUserRecord from './Record'
import { AdminUser } from '../../../utils/appTypes'

type AdminUserTableProps = {
    adminUsers: AdminUser[],
    update: (adminUser: AdminUser) => void
    delete: (adminUserId: number) => void
}

export default function AdminUserTable(props: AdminUserTableProps) {
    console.log(props.adminUsers)
    return (
        <Container fluid style={{ paddingTop: 60 }}>
            <Table striped bordered hover variant="light" responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Group</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {props.adminUsers.map((adminUser, index) => (
                        <AdminUserRecord
                            key={index}
                            adminUser={adminUser}
                            update={props.update}
                            delete={props.delete}
                        />
                    ))}
                </tbody>
            </Table>
            {props.adminUsers.length > 0 ? null : <h4 className="align-middle">No admin user in database!</h4>}
            <br />
            <br />
        </Container>
    )
}