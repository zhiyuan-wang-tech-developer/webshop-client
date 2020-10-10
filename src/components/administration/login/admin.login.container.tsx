import React, { Component } from 'react'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'
import AdminLoginPage from './admin.login.page'
import { LoginAdmin } from '../../../utils/app.types'
import { Login } from '../../../actions/login.admin.actions'

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        Login
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

const initialValues: LoginAdmin = {
    email: "",
    password: ""
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address!")
        .min(5, "Email must be at least 5 characters!")
        .required("Email is required!"),
    password: Yup.string()
        .min(4, "Password must be at least 4 characters!")
        .max(20, "Password maximum length is 20 characters!")
        .required("Password is required!")
})


class AdminLoginContainer extends Component<PropsFromRedux> {
    handleLoginAdmin = (values: LoginAdmin) => {
        if (window.confirm(JSON.stringify(values, null, 2))) {
            this.props.Login(values)
            console.log("Submit admin login form!")
        }
    }

    render() {
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.handleLoginAdmin}
                component={AdminLoginPage}
            />
        )
    }
}

export default connector(AdminLoginContainer)