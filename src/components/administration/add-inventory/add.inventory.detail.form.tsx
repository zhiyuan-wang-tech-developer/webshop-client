import React, { useEffect, useState } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Response, get, put } from 'superagent'
import { urlItems } from '../../../constants/config'

const initialValues = {
    specification: '',
    usage: ''
}

const labels = (itemDetail: any) => {
    let ret = null
    if (itemDetail) {
        ret = {
            formTitle: `Edit an item detail with ID: ${itemDetail.id}`,
            saveButton: "Update"
        }
    }
    else {
        ret = {
            formTitle: `Add a new item detail into inventory`,
            saveButton: "Save"
        }
    }
    return ret
}

const validationSchema = Yup.object(
    {
        specification: Yup.string()
            .required('specification is required!')
            .max(300, 'specification contains at most 300 characters!'),
        usage: Yup.string()
            .required('usage is required!')
            .max(300, 'usage contains at most 300 characters!'),
    }
)

function AddInventoryDetailForm() {
    const { url, params } = useRouteMatch()
    const { id }: any = params

    const [itemDetailState, setItemDetailState] = useState(null)

    const { submitForm, handleChange, handleBlur, setValues, values, touched, errors, isValid } = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: (values) => {
                if (window.confirm(JSON.stringify(values, null, 2))) {
                    if (!id) return
                    const itemDetail = { ...values }
                    put(urlItems + `/${id}`)
                        .send({ itemDetail })
                        .then((response: Response) => {
                            const { updatedItem } = response.body
                            if (!updatedItem) {
                                throw new Error("Can not get the updated item!");
                            }
                            window.location.href = `/admin/inventory/find?id=${id}`
                        })
                        .catch(console.warn)
                }
            }
        }
    )

    useEffect(() => {
        if (!id) return
        get(urlItems + `/id/${id}`)
            .then((response: Response) => {
                const { item } = response.body
                if (!item) {
                    throw new Error("Can not get item!");
                }
                const { itemDetail } = item
                if (itemDetail) {
                    setValues(itemDetail)
                    setItemDetailState(itemDetail)
                }
                else {
                    setItemDetailState(null)
                }
            })
            .catch(console.error)
        // eslint-disable-next-line
    }, [id])

    return (
        <Container fluid style={{
            paddingTop: 80,
            paddingLeft: 300,
            paddingRight: 300
        }}>
            <h5>{labels(itemDetailState).formTitle}</h5>
            <Form.Group controlId="formItemSpecification" as={Row}>
                <Form.Label column sm={2}>Specification</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        name="specification"
                        as="textarea"
                        rows={5}
                        size="sm"
                        value={values.specification}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.specification && !errors.specification}
                        isInvalid={!!errors.specification}
                    />
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.specification}</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group controlId="formItemUsage" as={Row}>
                <Form.Label column sm={2}>Usage</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        name="usage"
                        as="textarea"
                        rows={5}
                        size="sm"
                        value={values.usage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.usage && !errors.usage}
                        isInvalid={!!errors.usage}
                    />
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.usage}</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Row>
                <Col sm={2} />
                <Col sm={5}>
                    <Button
                        variant="outline-primary"
                        type='submit'
                        style={{ width: 100 }}
                        disabled={!isValid}
                        onClick={submitForm}
                    >{labels(itemDetailState).saveButton}</Button>
                </Col>
                <Col sm={5}>
                    <Button
                        variant="outline-secondary"
                        style={{ width: 100 }}
                        href={`${url}/../../find`}
                    >Cancel</Button>
                </Col>
            </Row>
        </Container >
    )
}

export default AddInventoryDetailForm