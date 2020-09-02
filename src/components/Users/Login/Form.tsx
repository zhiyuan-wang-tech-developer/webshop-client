import React from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { FormProps, LoginUser } from '../../../utils/appTypes'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Login } from '../../../actions/loginUserActions'
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        Login
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsTypeFromRedux = ConnectedProps<typeof connector>

const initialValues: LoginUser = {
    email: "",
    password: ""
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address!")
        .min(10, "Email must be more than 10 characters!")
        .max(40, "Email maximum length is 40 characters!")
        .required("The email is a required field!"),
    password: Yup.string()
        .min(8, "Password must be more than 8 characters!")
        .max(20, "Password maximum length is 20 characters!")
        .required("The password is a required field!")
})

function LoginForm(props: FormProps & PropsTypeFromRedux) {
    const handleLogin = (values: LoginUser) => {
        if (window.confirm(JSON.stringify(values, null, 2))) {
            props.Login(values)
            console.log("Submit login form!")
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {
                ({
                    submitForm,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors
                }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formLoginEmail" as={Row}>
                                <Form.Label column sm={2}>Email</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="valid">Correct Email Format!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formLoginPassword" as={Row}>
                                <Form.Label column sm={2}>Password</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="valid">Correct Password Format!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={!isValid}
                                        onClick={
                                            () => submitForm()
                                                .catch(console.error)
                                        }
                                    >Login</Button>
                                    <Form.Text muted>
                                        Don't have an account?<button type="button" className="btn btn-link btn-sm" onClick={props.switchForm}><strong >Register</strong></button>
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                        </Form >
                    )
            }
        </Formik >
    )
}

export default connector(LoginForm)