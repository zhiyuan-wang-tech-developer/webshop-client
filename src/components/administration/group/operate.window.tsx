import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import { ModalWindowProps, Group } from "../../../utils/app.types"
import ProfileForm, { initialValues, validationSchema } from './profile.form'

type OperateWindowProps = ModalWindowProps & {
    group?: Group,
    operate: (group: Group) => void
}

function OperateWindow(props: OperateWindowProps) {
    const handleOperateEvent = (values: Group) => {
        if (window.confirm(JSON.stringify(values, null, 2))) {
            props.operate(values)
            props.onHide()
        }
    }

    const formik = useFormik(
        {
            initialValues: props.group || initialValues,
            validationSchema,
            onSubmit: handleOperateEvent,
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
                    <Modal.Title>Group Profile</Modal.Title>
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

export default OperateWindow