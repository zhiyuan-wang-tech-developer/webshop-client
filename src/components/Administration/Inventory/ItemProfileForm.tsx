import React from 'react'
import { Form, Col } from 'react-bootstrap';
import * as Yup from 'yup'
import { ItemType } from '../../../utils/appTypes';

export const initialValues: Partial<ItemType> = {
    name: '',
    description: '',
    category: 'Books',
    price: 0,
    status: 'FOR SALE',
    quantityInStock: 0
}

// Create a validation object schema which contains the rules for the form fields.
export const validationSchema = Yup.object(
    {
        id: Yup.number().notRequired(),
        name: Yup.string()
            .required('Name is required!')
            .min(1, "Name must contain at least 1 characters!")
            .max(25, "Name must be no more than 25 characters long!"),
        description: Yup.string()
            .required('Description is required!')
            .max(200, 'Description contains at most 200 characters!'),
        category: Yup.string()
            .required('Category is required!'),
        price: Yup.number()
            .required('Price is required!')
            .min(0, 'Price must be greater than or equal to zero!'),
        status: Yup.string()
            .required('Status is required!'),
        quantityInStock: Yup.number()
            .required('Quantity In Stock is required!')
            .integer('Quantity In Stock must be an integer!')
            .min(0, 'Quantity In Stock must be greater than or equal to zero!')
    }
);

export default function ItemProfileForm(props: { formik: any }) {
    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = props.formik
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group controlId="formItemId" as={Col}>
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
                <Form.Group controlId="formItemName" as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        as="input"
                        placeholder="Item Name"
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
            <Form.Group controlId="formItemDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    name="description"
                    as="textarea"
                    placeholder="Item Description"
                    size="sm"
                    rows={5}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.description && !errors.description}
                    isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
                <Form.Group controlId="formItemCategory" as={Col}>
                    <Form.Label>Category</Form.Label>
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
                </Form.Group>
                <Form.Group controlId="formItemPrice" as={Col}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        name="price"
                        as="input"
                        placeholder="Item Price"
                        size="sm"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.price && !errors.price}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="formItemStatus" as={Col}>
                    <Form.Label>Status</Form.Label>
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
                </Form.Group>
                <Form.Group controlId="formItemQuantity" as={Col}>
                    <Form.Label>Quantity in Stock</Form.Label>
                    <Form.Control
                        name="quantityInStock"
                        as="input"
                        placeholder="Item Quantity"
                        size="sm"
                        value={values.quantityInStock}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.quantityInStock && !errors.quantityInStock}
                        isInvalid={!!errors.quantityInStock}
                    />
                    <Form.Control.Feedback type="valid">Correct!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.quantityInStock}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formItemPhoto">
                <Form.Label>Photo</Form.Label>
                <Form.File custom lang="en">
                    <Form.File.Input />
                    <Form.File.Label data-browse="Choose File">Upload Photo File</Form.File.Label>
                </Form.File>
            </Form.Group>
        </Form>
    )
}