import React, { useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Response, get } from 'superagent'
import * as Yup from 'yup'
import Config from '../../../configuration'
import { AdminUser, AdminUserGroup } from '../../../utils/appTypes'

const baseURL = Config.URL.LocalHostURL

export const initialValues: AdminUser = {
    name: '',
    email: '',
    password: '',
    adminUserGroups: []
}

// Create a validation object schema which contains the rules for the form fields.
export const validationSchema = Yup.object(
    {
        id: Yup.number()
            .notRequired(),
        name: Yup.string()
            .required('Name is required!')
            .min(1, "Name must contain at least 1 characters!")
            .max(25, "Name must be no more than 25 characters long!"),
        email: Yup.string()
            .required('Email is required!')
            .email("It must be a valid email format!"),
        password: Yup.string()
            .required('Password is required!'),
        adminUserGroups: Yup.array()
            .of(Yup.object()
                .shape<AdminUserGroup>({
                    id: Yup.number().required(),
                    name: Yup.string().required(),
                    description: Yup.string().required()
                }))
    }
)

export default function ProfileForm(props: { formik: any }) {
    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = props.formik

    const [availableGroups, setAvailableGroups] = useState<AdminUserGroup[]>([])
    const [assignedGroups, setAssignedGroups] = useState<AdminUserGroup[]>(values.adminUserGroups)
    const [groupToAssign, setGroupToAssign] = useState<AdminUserGroup | null>(null)
    const [groupToRemove, setGroupToRemove] = useState<AdminUserGroup | null>(null)

    useEffect(() => {
        get(`${baseURL}/admin/groups`)
            .send()
            .then((response: Response) => {
                const { groups } = response.body
                if (!groups) {
                    throw new Error("Can not fetch groups!");
                }
                const availableGroups: AdminUserGroup[] = groups.filter((group: any) => {
                    return !assignedGroups.find((assignedGroup: AdminUserGroup) => assignedGroup.id === group.id);
                })
                setAvailableGroups(availableGroups)
            })
            .catch(console.warn)
    }, [])

    const selectAvailableGroup = (event: React.MouseEvent<HTMLSelectElement>) => {
        const { value } = event.target as HTMLOptionElement
        const groupToAssign = availableGroups.find(group => group.id.toString() === value)
        if (groupToAssign) {
            setGroupToAssign(groupToAssign)
        } else {
            setGroupToAssign(null)
        }
    }

    const selectAssignedGroup = (event: React.MouseEvent<HTMLSelectElement>) => {
        const { value } = event.target as HTMLOptionElement
        const groupToRemove = assignedGroups.find(group => group.id.toString() === value)
        if (groupToRemove) {
            setGroupToRemove(groupToRemove)
        } else {
            setGroupToRemove(null)
        }
    }

    const addUserToGroup = () => {
        if (groupToAssign && !assignedGroups.find(group => group.id === groupToAssign.id)) {
            setAvailableGroups(availableGroups.filter(group => group.id !== groupToAssign.id))
            const updatedAssignedGroups = [...assignedGroups, groupToAssign].sort((groupA, groupB) => groupA.id - groupB.id)
            setAssignedGroups(updatedAssignedGroups)
            values.adminUserGroups = updatedAssignedGroups
            setGroupToAssign(null)
        }
    }

    const removeUserFromGroup = () => {
        if (groupToRemove && assignedGroups.find(group => group.id === groupToRemove.id)) {
            setAvailableGroups([...availableGroups, groupToRemove].sort((groupA, groupB) => groupA.id - groupB.id))
            const updatedAssignedGroups = assignedGroups.filter(group => group.id !== groupToRemove.id)
            setAssignedGroups(updatedAssignedGroups)
            values.adminUserGroups = updatedAssignedGroups
            setGroupToRemove(null)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* <Form.Row>
                <Form.Group controlId="adminUserIdForm" as={Col}>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        name="id"
                        as="input"
                        placeholder=""
                        size="sm"
                        disabled
                        value={values.id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.id && !errors.id}
                        isInvalid={!!errors.id}
                    />
                </Form.Group>
            </Form.Row> */}
            <Form.Row>
                <Form.Group controlId="adminUserNameForm" as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        as="input"
                        size="sm"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.name && !errors.name}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="adminUserEmailForm" as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        as="input"
                        size="sm"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="adminUserPasswordForm" as={Col}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        as="input"
                        size="sm"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="availableGroupForm" as={Col}>
                    <Form.Label>Available Groups</Form.Label>
                    <Form.Control
                        name="availableGroups"
                        as="select"
                        size="sm"
                        onClick={selectAvailableGroup}
                        onBlur={handleBlur}
                        isValid={touched.adminUserGroups && !errors.adminUserGroups}
                        isInvalid={!!errors.adminUserGroups}
                    >
                        <option selected>Choose group to assign</option>
                        {availableGroups.map((group: AdminUserGroup, index: number) => <option key={index} value={group.id} label={group.name}>{group.name}</option>)}
                    </Form.Control>
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.group}</Form.Control.Feedback>
                    <br />
                    <Button
                        variant="info"
                        size="sm"
                        disabled={!(availableGroups.length > 0)}
                        style={{ width: "200px" }}
                        onClick={addUserToGroup}
                    >Assign user to groups</Button>
                </Form.Group>
                <Form.Group controlId="assignedGroupForm" as={Col}>
                    <Form.Label>Assigned Groups</Form.Label>
                    <Form.Control
                        name="assignedGroups"
                        as="select"
                        size="sm"
                        onClick={selectAssignedGroup}
                        onBlur={handleBlur}
                        isValid={touched.adminUserGroups && !errors.adminUserGroups}
                        isInvalid={!!errors.adminUserGroups}
                    >
                        <option selected>Choose group to remove</option>
                        {assignedGroups.map((group: AdminUserGroup, index: number) => <option key={index} value={group.id} label={group.name}>{group.name}</option>)}
                    </Form.Control>
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.group}</Form.Control.Feedback>
                    <br />
                    <Button
                        variant="info"
                        size="sm"
                        onClick={removeUserFromGroup}
                        disabled={!(assignedGroups.length > 0)}
                        style={{ width: "200px" }}
                    >Remove user from groups</Button>
                </Form.Group>
            </Form.Row>
        </Form >
    )
}