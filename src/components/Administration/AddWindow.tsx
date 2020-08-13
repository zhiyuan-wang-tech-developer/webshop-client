import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalWindowPropsType } from "../../utils/appTypes";
import ItemProfileForm from './ItemProfileForm';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "./ItemProfileForm";
import { createItem } from "../../actions/inventoryActions";
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        createItem
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type AddWindowPropsType = ModalWindowPropsType & PropsFromRedux;

function AddWindow(props: AddWindowPropsType) {
    const handleAdd = (values: any) => {
        if (window.confirm(JSON.stringify(values, null, 2))) {
            console.log("Add item submission!")
            props.createItem(values);
        };
    }
    const formik = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: handleAdd,
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
                        variant="danger"
                        type='submit'
                        disabled={!formik.isValid}
                        onClick={
                            () => formik
                                .submitForm()
                                .catch(console.error)
                        }
                    >Add</Button>
                    <Button variant="outline-secondary" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment >
    )
}

export default connector(AddWindow)