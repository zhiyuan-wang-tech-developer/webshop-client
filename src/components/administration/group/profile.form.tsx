import React from 'react'
import { Form, Col } from 'react-bootstrap'
import * as Yup from 'yup'
import { Group } from '../../../utils/app.types'

export const initialValues: Group = {
    name: '',
    description: ''
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
        description: Yup.string()
            .required('Description is required!'),
    }
)

export default function ProfileForm(props: { formik: any }) {
    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = props.formik

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group controlId="groupNameForm" as={Col}>
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
                <Form.Group controlId="groupDescriptionForm" as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        as="input"
                        size="sm"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.description && !errors.description}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </Form >
    )
}