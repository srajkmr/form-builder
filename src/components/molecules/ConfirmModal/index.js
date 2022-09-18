import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({
  message,
  onCancel,
  onConfirm,
  btnOne = "Delete",
  btnTwo = "Cancel",
}) => {
  return (
    <Modal show={true} onHide={onCancel} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {btnTwo}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {btnOne}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
