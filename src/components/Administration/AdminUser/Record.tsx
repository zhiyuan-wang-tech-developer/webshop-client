import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import EditWindow from './EditWIndow'
import { AdminUser, AdminUserGroup } from '../../../utils/appTypes'

type AdminUserRecordProps = {
    adminUser: AdminUser
    update: (adminUser: AdminUser) => void
    delete: (adminUserId: number) => void
}

const AdminUserRecord = (props: AdminUserRecordProps) => {
    const [showEditWIndow, setShowEditWindow] = useState(false);
    const openEditWindow = () => setShowEditWindow(true);
    const closeEditWindow = () => setShowEditWindow(false);

    const handleDeleteEvent = () => {
        if (props.adminUser.id && window.confirm("Are you sure to delete this admin user?"))
            props.delete(props.adminUser.id)
    }

    return (
        <React.Fragment>
            <tr>
                <td>{props.adminUser.id}</td>
                <td>{props.adminUser.name}</td>
                <td>{props.adminUser.email}</td>
                <td>{props.adminUser.adminUserGroups.map((group: AdminUserGroup) => group.name).join(", ")}</td>
                <td>
                    <Button variant="outline-primary" onClick={openEditWindow}>
                        <span className="fa fa-edit fa-lg"></span>
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Button variant="outline-danger" onClick={handleDeleteEvent}>
                        <span className="fa fa-trash-o fa-lg"></span>
                    </Button>
                </td>
            </tr>
            <EditWindow
                show={showEditWIndow}
                onHide={closeEditWindow}
                adminUser={props.adminUser}
                update={props.update}
            />
        </React.Fragment>
    )
}

export default AdminUserRecord