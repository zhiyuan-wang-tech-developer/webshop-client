import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FormProps } from '../../../utils/appTypes'
import * as Yup from 'yup'
import { get, Response } from "superagent"
import { useFormik } from 'formik'
import { UserRegisterType } from '../../../utils/appTypes'
import { Register } from '../../../actions/loginActions'
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        Register
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsTypeFromRedux = ConnectedProps<typeof connector>

const initialValues: UserRegisterType = {
    name: '',
    email: '',
    password: '',
    address: '',
    zip: '',
    city: 'Beijing',
    country: 'China'
}

const validationSchema = Yup.object(
    {
        name: Yup.string().required('Name is required!'),
        email: Yup.string().required('Email is required!').email("Invalid email format!"),
        password: Yup.string().required('Password is required!'),
        address: Yup.string().required('Address is required!'),
        zip: Yup.string().required('Zip is required!'),
        city: Yup.string().required('City is required!'),
        country: Yup.string().required('Country is required!')
    }
)

// const cityOptions: Array<string> = ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Xiamen", "Changsha", "Wuhan", "Chengdu", "Chongqin", "Xi'an"]

function RegisterForm(props: FormProps & PropsTypeFromRedux) {
    const handleRegister = (values: UserRegisterType) => {
        if (window.confirm(JSON.stringify(values, null, 2))) {
            props.Register(values)
            console.log("Submit register form!")
        }
    }

    const [cityOptions, setCityOptions] = useState(new Array<string>(0))

    useEffect(() => {
        get("http://localhost:3001/options/city")
            .send()
            .then((response: Response) => setCityOptions(response.body.cities));
    }, [])

    const formik = useFormik<UserRegisterType>(
        {
            initialValues,
            validationSchema,
            onSubmit: handleRegister
        }
    )
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formRegisterName" as={Row}>
                <Form.Label column sm={2}>Name</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        name="name"
                        as="input"
                        placeholder="Enter your full name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isValid={formik.touched.name && !formik.errors.name}
                        isInvalid={!!formik.errors.name}
                    />
                    <Form.Control.Feedback type="valid">Correct Name Format!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group controlId="formRegisterEmail" as={Row}>
                <Form.Label column sm={2}>Email</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isValid={formik.touched.email && !formik.errors.email}
                        isInvalid={!!formik.errors.email}
                    />
                    <Form.Control.Feedback type="valid">Correct Email Format!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Col>
            </Form.Group>
            <Form.Group controlId="formRegisterPassword" as={Row}>
                <Form.Label column sm={2}>Password</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isValid={formik.touched.password && !formik.errors.password}
                        isInvalid={!!formik.errors.password}
                    />
                    <Form.Control.Feedback type="valid">Correct Password Format!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Address</Form.Label>
                <Col sm={4}>
                    <Form.Control
                        name="address"
                        id="formRegisterAddress"
                        placeholder="e.g. 1234 Main Street"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isValid={formik.touched.address && !formik.errors.address}
                        isInvalid={!!formik.errors.address}
                    />
                    <Form.Control.Feedback type="valid">Correct Address Format!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
                </Col>
                <Form.Label column sm={2}>Zip</Form.Label>
                <Col sm={4}>
                    <Form.Control
                        name="zip"
                        id="formRegisterZip"
                        placeholder="e.g. 80086"
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isValid={formik.touched.zip && !formik.errors.zip}
                        isInvalid={!!formik.errors.zip}
                    />
                    <Form.Control.Feedback type="valid">Correct Zip Format!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.zip}</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>City</Form.Label>
                <Col sm={4}>
                    <Form.Control
                        name="city"
                        id="formRegisterCity"
                        as="select"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isValid={formik.touched.city && !formik.errors.city}
                        isInvalid={!!formik.errors.city}
                    >
                        {cityOptions.map((city, index) => <option key={index.toString()}>{city}</option>)}
                    </Form.Control>
                    <Form.Control.Feedback type="valid">Correct City Format!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
                </Col>
                <Form.Label column sm={2}>Country</Form.Label>
                <Col sm={4}>
                    <Form.Control
                        name="country"
                        id="formRegisterCountry"
                        as="select"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isValid={formik.touched.country && !formik.errors.country}
                        isInvalid={!!formik.errors.country}
                    >
                        <option>China</option>
                    </Form.Control>
                    <Form.Control.Feedback type="valid">Correct Country Format!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!formik.isValid}
                        onClick={
                            () => formik
                                .submitForm()
                                .catch(console.error)
                        }
                    >Register</Button>
                    <Form.Text muted>
                        Already have an account?<button type="button" className="btn btn-link btn-sm" onClick={props.switchForm}><strong >Log In</strong></button>
                    </Form.Text>
                </Col>
            </Form.Group>
        </Form >
    )
}

export default connector(RegisterForm)