import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import { ModalWindowProps, AdminUser } from "../../../utils/app.types"
import ProfileForm, { initialValues, validationSchema } from './profile.form'

type CreateWindowProps = ModalWindowProps & {
    create: (adminUser: AdminUser) => void
}
// TODO: combine create & edit windows to one window
function CreateWindow(props: CreateWindowProps) {
    const handleCreateEvent = (values: AdminUser) => {
        if (window.confirm(JSON.stringify(values, null, 2))) {
            props.create(values)
            props.onHide()
        }
    }

    const formik = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: handleCreateEvent,
        }
    )

    return (
        <React.Fragment>
            <Modal
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.show}
                onHide={props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Admin User Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileForm formik={formik} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        type='submit'
                        disabled={!formik.isValid}
                        onClick={
                            () => formik
                                .submitForm()
                                .catch(console.error)
                        }
                        style={{ width: "100px" }}
                    >Save</Button>
                    <Button
                        variant="outline-secondary"
                        onClick={props.onHide}
                        style={{ width: "100px" }}
                    >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment >
    )
}

export default CreateWindow