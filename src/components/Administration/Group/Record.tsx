import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import OperateWindow from './operate.window'
import { Group } from '../../../utils/app.types'

type GroupRecordProps = {
    group: Group
    update: (group: Group) => void
    delete: (groupId: number) => void
}

const GroupRecord = (props: GroupRecordProps) => {
    const [showEditWIndow, setShowEditWindow] = useState(false);
    const openEditWindow = () => setShowEditWindow(true);
    const closeEditWindow = () => setShowEditWindow(false);

    const handleDeleteEvent = () => {
        if (props.group.id && window.confirm("Are you sure to delete this group?"))
            props.delete(props.group.id)
    }

    return (
        <React.Fragment>
            <tr>
                <td>{props.group.id}</td>
                <td>{props.group.name}</td>
                <td>{props.group.description}</td>
                <td>
                    <Button variant="outline-primary" onClick={openEditWindow}>
                        <span className="fa fa-edit fa-lg"></span>
                    </Button>
                </td>
                <td>
                    <Button variant="outline-danger" onClick={handleDeleteEvent}>
                        <span className="fa fa-trash-o fa-lg"></span>
                    </Button>
                </td>
            </tr>
            <OperateWindow
                show={showEditWIndow}
                onHide={closeEditWindow}
                group={props.group}
                operate={props.update}
            />
        </React.Fragment>
    )
}

export default GroupRecord