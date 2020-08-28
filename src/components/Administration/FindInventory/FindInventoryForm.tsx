import React, { useState, useEffect, useContext } from 'react'
import { Container, Accordion, Card, Form, Col, Row, Button, Jumbotron } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch, TypedUseSelectorHook, shallowEqual } from 'react-redux'
import { useFormik } from 'formik'
import { Response, get, put, del } from 'superagent'
import FindResultsTable from './FindResultsTable'
import { urlItems, urlItemsFind } from '../../../constants/config'
import { Item } from '../../../utils/appTypes'
import { findResults, findResultsOnCurrentPage } from '../../../actions/findActions'
import { RootState } from '../../../reducer/rootReducer'
import PaginationBar from './PaginationBar'
import { Typography } from '@material-ui/core'
import { InventoryUpdateContext } from '../AddInventory/UpdateContext'

/**
 *  TODO:
 *  1. replace red feedback with popup window when mouse hover on.
 */
const initialValues = {
    category: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    minQuantityInStock: '',
    maxQuantityInStock: '',
    name: '',
    description: '',
    id: ''
}

function FindInventoryForm() {
    // const [itemsFound, setItemsFound] = useState<Item[]>([])
    const { search } = useLocation()

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
    const itemsFound = useTypedSelector(state => state.foundResultState.items as Item[], shallowEqual)
    const pageCurrent = useTypedSelector(state => state.foundResultState.currentPage)
    const dispatch = useDispatch()

    // const { updateContext, changeContext }: any = useContext(InventoryUpdateContext)
    // const { operation, itemId: id } = updateContext

    const { submitForm, handleChange, handleBlur, handleReset, values, touched, errors, isValid } = useFormik(
        {
            initialValues,
            onSubmit: (values) => {
                const queryParams = Object.fromEntries(Object.entries(values).filter(entry => entry[1] !== ''))
                if (window.confirm(JSON.stringify(queryParams, null, 2))) {
                    findResults(queryParams, 1)(dispatch)
                }
            }
        }
    )

    useEffect(() => {
        // console.log("operation: ", operation)
        console.log("search: ", search)
        if (search) {
            values.id = search.split("=")[1]
            submitForm()
        }
        else {
            console.log('pageCurrent after: ', pageCurrent)
            // console.log(pageCurrent)/
            // findResults({}, pageCurrent)(dispatch)
            // findResultsOnCurrentPage(13)
        }
    }, [search])

    const getItems = () => {
        get(`${urlItems}`)
            .then((response: Response) => {
                if (!response.body.items) {
                    throw new Error("Can not get items!");
                }
                // setItemsFound([...response.body.items])
            })
            .catch(error => console.warn(error))
    }

    const updateItem = (item: Item) => {
        put(urlItems + `/${item.id}`)
            .send(item)
            .then((response: Response) => {
                const { updatedItem } = response.body
                if (!updatedItem) {
                    throw new Error("Can not get the updated item!");
                }
                const updatedItems = itemsFound.map(item => {
                    if (item.id !== updatedItem.id)
                        return item
                    else
                        return updatedItem
                })
                // setItemsFound(updatedItems)
            })
            .catch(console.warn)
    }

    const deleteItem = (itemId: number) => {
        del(urlItems + `/${itemId}`)
            .then((response: Response) => {
                const { itemIsDeleted } = response.body
                if (!itemIsDeleted) {
                    throw new Error("Can not delete the item!");
                }
                const updatedItems = itemsFound.filter(item => item.id !== itemId)
                // setItemsFound(updatedItems)
            })
            .catch(console.warn)
    }

    return (
        <Container fluid style={{
            paddingTop: 80,
            paddingLeft: 50,
            paddingRight: 50
        }}>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle
                            as={Button}
                            variant="outline-info"
                            style={{ width: 300 }}
                            eventKey="find">
                            Filter items by
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="find">
                        <Card.Body>
                            <Jumbotron as={Form}>
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
                                            <option value={''}>--- please choose a category ---</option>
                                            <option>Books</option>
                                            <option>Electronics</option>
                                            <option>Transports</option>
                                        </Form.Control>
                                    </Form.Group>
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
                                            <option value={''}>--- please choose a status ---</option>
                                            <option>FOR SALE</option>
                                            <option>SUMMER SALE</option>
                                            <option>WINTER SALE</option>
                                            <option>OUT OF STOCK</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Col sm={3}>
                                        <Form.Group controlId="formItemMinPrice">
                                            <Form.Label>Min Price</Form.Label>
                                            <Form.Control
                                                name="minPrice"
                                                as="input"
                                                size="sm"
                                                value={values.minPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.minPrice && !errors.minPrice}
                                                isInvalid={!!errors.minPrice}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group controlId="formItemMaxPrice">
                                            <Form.Label>Max Price</Form.Label>
                                            <Form.Control
                                                name="maxPrice"
                                                as="input"
                                                size="sm"
                                                value={values.maxPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.maxPrice && !errors.maxPrice}
                                                isInvalid={!!errors.maxPrice}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group controlId="formItemMinQuantity">
                                            <Form.Label>Min Quantity in Stock</Form.Label>
                                            <Form.Control
                                                name="minQuantityInStock"
                                                as="input"
                                                size="sm"
                                                value={values.minQuantityInStock}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.minQuantityInStock && !errors.minQuantityInStock}
                                                isInvalid={!!errors.minQuantityInStock}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group controlId="formItemMaxQuantity">
                                            <Form.Label>Max Quantity in Stock</Form.Label>
                                            <Form.Control
                                                name="maxQuantityInStock"
                                                as="input"
                                                size="sm"
                                                value={values.maxQuantityInStock}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.maxQuantityInStock && !errors.maxQuantityInStock}
                                                isInvalid={!!errors.maxQuantityInStock}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col sm={6}>
                                        <Form.Group controlId="formItemName">
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
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group controlId="formItemDescription">
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
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col sm={6}>
                                        <Form.Group controlId="formItemId">
                                            <Form.Label>Item ID</Form.Label>
                                            <Form.Control
                                                name="id"
                                                as="input"
                                                size="sm"
                                                value={values.id}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.id && !errors.id}
                                                isInvalid={!!errors.id}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                            </Jumbotron>
                            <Row>
                                <Col sm={6}>
                                    <Button
                                        variant="outline-primary"
                                        type='submit'
                                        style={{ width: 120 }}
                                        disabled={!isValid}
                                        onClick={submitForm}
                                    ><Typography>Find items</Typography></Button>
                                </Col>
                                <Col sm={6}>
                                    <Button
                                        variant="outline-secondary"
                                        style={{ width: 120 }}
                                        onClick={handleReset}
                                    ><Typography>Clear filter</Typography></Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <FindResultsTable
                items={itemsFound as Item[]}
                update={updateItem}
                delete={deleteItem}
            />
            <PaginationBar />
        </Container>
    )
}

export default FindInventoryForm