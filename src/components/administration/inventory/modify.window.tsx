import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalWindowProps, Item } from "../../../utils/app.types";
import ItemProfileForm, { initialValues, validationSchema } from './item.profile.form';
import { useFormik } from "formik";
import { updateItem } from "../../../actions/inventory.actions";
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        updateItem
    },
    dispatch
)

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type ModifyWIndowPropsType = ModalWindowProps & { item: Item } & PropsFromRedux

function ModifyWindow(props: ModifyWIndowPropsType) {
    const handleModify = (values: Item) => {
        if (window.confirm(JSON.stringify(values, null, 2))) {
            props.updateItem(values)
        };
    }

    const formik = useFormik(
        {
            initialValues: props.item || initialValues,
            validationSchema,
            onSubmit: handleModify
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
                        onClick={
                            () => formik.submitForm()
                                .then(() => console.log("Save submission!"))
                                .catch(console.error)
                        }
                    >Save</Button>
                    <Button variant="outline-secondary" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default connector(ModifyWindow)