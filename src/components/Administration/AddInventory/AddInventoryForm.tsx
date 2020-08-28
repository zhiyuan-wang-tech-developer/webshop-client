import React, { useEffect, useContext } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Response, get, post } from 'superagent'
import { urlItems } from '../../../constants/config'
import { Item } from '../../../utils/appTypes'
import { InventoryUpdateContext } from './UpdateContext'

const initialValues: Partial<Item> = {
    name: '',
    description: '',
    price: 0,
    category: 'Books',
    status: 'FOR SALE',
    quantityInStock: 0
}

const validationSchema = Yup.object(
    {
        name: Yup.string()
            .required('Name is required!')
            .min(1, "Name must contain at least 1 characters!")
            .max(25, "Name must be no more than 25 characters long!"),
        description: Yup.string()
            .required('Description is required!')
            .max(200, 'Description contains at most 200 characters!'),
        price: Yup.number()
            .required('Price is required!')
            .min(0, 'Price must be greater than or equal to zero!'),
        category: Yup.string()
            .required('Category is required!'),
        status: Yup.string()
            .required('Status is required!'),
        quantityInStock: Yup.number()
            .required('Quantity In Stock is required!')
            .integer('Quantity In Stock must be an integer!')
            .min(0, 'Quantity In Stock must be greater than or equal to zero!')
    }
)

// TODO: hide the route parameter /edit/:id
function AddInventoryForm() {
    const { url, params } = useRouteMatch()
    const { id }: any = params

    // const { updateContext, changeContext }: any = useContext(InventoryUpdateContext)
    // const { itemId: id } = updateContext

    const { submitForm, handleChange, handleBlur, setValues, values, touched, errors, isValid } = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: (values: Partial<Item>) => {
                if (window.confirm(JSON.stringify(values, null, 2))) {
                    post(urlItems)
                        .set('content-type', 'application/json')
                        .send(values)
                        .then((response: Response) => {
                            const { createdItem } = response.body
                            if (!createdItem) {
                                throw new Error("Can not get the created item!");
                            }
                        })
                        .catch(console.warn)
                }
            }
        }
    )

    useEffect(() => {
        if (id) {
            get(urlItems + `/id/${id}`)
                .then((response: Response) => {
                    const { item } = response.body
                    if (!item) {
                        throw new Error("Can not get item!");
                    }
                    setValues(item)
                })
                .catch(console.error)
        }
    }, [id])

    const formTitle = () => {
        return id ? (<h5>Edit an item with ID: {id}</h5>) : (<h5>Add a new item into inventory</h5>)
    }

    return (
        <Container fluid style={{
            paddingTop: 80,
            paddingLeft: 300,
            paddingRight: 300
        }}>
            {formTitle()}
            <Form>
                <Form.Group controlId="formItemName" as={Row}>
                    <Form.Label column sm={2}>Name</Form.Label>
                    <Col sm={10}>
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
                    </Col>
                </Form.Group>
                <Form.Group controlId="formItemDescription" as={Row}>
                    <Form.Label column sm={2}>Description</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            name="description"
                            as="textarea"
                            rows={3}
                            size="sm"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.description && !errors.description}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formItemPrice" as={Row}>
                    <Form.Label column sm={2}>Price</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            name="price"
                            as="input"
                            size="sm"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.price && !errors.price}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formItemCategory" as={Row}>
                    <Form.Label column sm={2}>Category</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            name="category"
                            as="select"
                            size="sm"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.category && !errors.category}
                            isInvalid={!!errors.category}
                        >
                            <option>Books</option>
                            <option>Electronics</option>
                            <option>Transports</option>
                        </Form.Control>
                        <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formItemStatus" as={Row}>
                    <Form.Label column sm={2}>Status</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            name="status"
                            as="select"
                            size="sm"
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.status && !errors.status}
                            isInvalid={!!errors.status}
                        >
                            <option>FOR SALE</option>
                            <option>SUMMER SALE</option>
                            <option>WINTER SALE</option>
                            <option>OUT OF STOCK</option>
                        </Form.Control>
                        <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formItemQuantity" as={Row}>
                    <Form.Label column sm={2}>Quantity in Stock</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            name="quantityInStock"
                            as="input"
                            size="sm"
                            value={values.quantityInStock}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.quantityInStock && !errors.quantityInStock}
                            isInvalid={!!errors.quantityInStock}
                        />
                        <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.quantityInStock}</Form.Control.Feedback>
                    </Col>
                </Form.Group>
            </Form>
            <Row>
                <Col sm={2} />
                <Col sm={5}>
                    <Button
                        variant="outline-primary"
                        type='submit'
                        style={{ width: 150 }}
                        href={id ? `${url}/../../detail/${id}` : `${url}/../detail/${id}`}
                        disabled={!isValid}
                        onClick={submitForm}
                    >Go to detail</Button>
                </Col>
                <Col sm={5}>
                    <Button
                        variant="outline-secondary"
                        style={{ width: 150 }}
                        href={id ? `${url}/../../find` : `${url}/../find`}
                    >Cancel</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AddInventoryForm