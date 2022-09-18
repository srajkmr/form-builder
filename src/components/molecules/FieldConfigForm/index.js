import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const FieldConfigForm = ({ item, onSubmit, onClose }) => {
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldHelpText, setFieldHelpText] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldRequired, setFieldRequired] = useState(false);

  useEffect(() => {
    const { label, helpText, required, type } = item.attributes;
    console.log({ label, helpText, required, type });
    setFieldLabel(label);
    setFieldHelpText(helpText);
    setFieldType(type);
    setFieldRequired(required);
  }, [item]);

  const onFormSubmit = () => {
    onSubmit({
      label: fieldLabel,
      helpText: fieldHelpText,
      required: fieldRequired,
      type: fieldType,
    });
  };

  return (
    <Form>
      <Modal show={true} onHide={onClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Field Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Field Label</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter label"
              value={fieldLabel}
              onChange={(e) => setFieldLabel(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Field Instructions</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter instructions"
              value={fieldHelpText}
              onChange={(e) => setFieldHelpText(e.target.value)}
            />
            <Form.Text className="text-muted">
              Show help text for the field
            </Form.Text>
          </Form.Group>
          {item && item.type === "input" && (
            <Form.Group className="mb-3">
              <Form.Label>Field Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="password">Password</option>
                <option value="file">File</option>
              </Form.Select>
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Is Required?"
              checked={fieldRequired}
              onChange={(e) => {
                console.log(e.target.checked);
                setFieldRequired(e.target.checked);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onFormSubmit()}>
            Save Config
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default FieldConfigForm;
