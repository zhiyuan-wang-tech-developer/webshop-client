import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ItemProfileForm, { validationSchema } from '../Inventory/ItemProfileForm';
import { useFormik } from "formik";
import { ModalWindowProps, Item } from "../../../utils/appTypes";

type EditWindowProps = ModalWindowProps & {
    item: Item
    update: (item: Item) => void
}

function EditWindow(props: EditWindowProps) {
    const formik = useFormik(
        {
            initialValues: props.item,
            validationSchema,
            onSubmit: (values: Item) => {
                if (window.confirm(JSON.stringify(values, null, 2))) {
                    props.update(values)
                    props.onHide()
                }
            }
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
                    <Modal.Title>Item Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ItemProfileForm formik={formik} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!formik.isValid}
                        style={{ width: 100 }}
                        onClick={
                            () => formik
                                .submitForm()
                                .catch(console.error)
                        }
                    >Save</Button>
                    <Button
                        variant="outline-secondary"
                        style={{ width: 100 }}
                        onClick={props.onHide}
                    >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default EditWindow