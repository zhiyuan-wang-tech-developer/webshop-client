import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useFormik } from "formik"
import { ModalWindowProps, AdminUser } from "../../../utils/appTypes"
import ProfileForm, { initialValues, validationSchema } from './ProfileForm'

type EditWIndowProps = ModalWindowProps & {
    adminUser: AdminUser,
    update: (adminUser: AdminUser) => void
}

function EditWIndow(props: EditWIndowProps) {
    const handleUpdateEvent = (values: AdminUser) => {
        if (window.confirm(JSON.stringify(values, null, 2))) {
            props.update(values)
            props.onHide()
        }
    }

    const formik = useFormik(
        {
            initialValues: props.adminUser || initialValues,
            validationSchema,
            onSubmit: handleUpdateEvent
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
                    <Modal.Title>Edit Admin User Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileForm formik={formik} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!formik.isValid}
                        style={{ width: "100px" }}
                        onClick={
                            () => formik
                                .submitForm()
                                .catch(console.error)
                        }
                    >Update</Button>
                    <Button
                        variant="outline-secondary"
                        onClick={props.onHide}
                        style={{ width: "100px" }}
                    >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default EditWIndow