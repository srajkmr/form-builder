import React from "react";
import { Form, Button } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import { Table } from "../../components/atoms";

export const Preview = (props) => {
  const { tree } = props;
  if (!tree) {
    return null;
  }

  const Tree = ({ tree }) => {
    return tree.map((node, index) => {
      if (node.children && node.children.length > 0) {
        switch (node.type) {
          case "table":
            return (
              <Table>
                <Tree tree={node.children} />
              </Table>
            );
          case "row":
            return (
              <div key={`row${node.id}`} className="d-flex align-items-stretch">
                <Tree tree={node.children} />
              </div>
            );
          case "cell":
            return (
              <div key={`cell${node.id}`} style={{ width: "50%" }}>
                <Tree tree={node.children} />
              </div>
            );
          default:
            return <Tree tree={node.children} key={`tree${node.id}`} />;
        }
      } else {
        switch (node.type) {
          case "cell":
            return <div key={`cell${node.id}`} style={{ width: "50%" }}></div>;
          case "input":
            return (
              <Form.Group className="p-2" controlId={`ControlInput${node.id}`}>
                {node.attributes.label && (
                  <Form.Label>
                    {node.attributes.label}{" "}
                    {node.attributes.required && (
                      <Asterisk size={8} style={{ color: "red" }} />
                    )}
                  </Form.Label>
                )}
                <Form.Control type={node.attributes.type} />
                {node.attributes.helpText && (
                  <Form.Text className="text-muted">
                    {node.attributes.helpText}
                  </Form.Text>
                )}
              </Form.Group>
            );
          case "checkbox":
            return (
              <Form.Group className="p-2" controlId={`ControlInput${node.id}`}>
                <Form.Check
                  type="checkbox"
                  label={node.attributes.label ? node.attributes.label : ""}
                />
                {node.attributes.helpText && (
                  <Form.Text className="text-muted">
                    {node.attributes.helpText}
                  </Form.Text>
                )}
              </Form.Group>
            );
          case "text":
            return (
              <Form.Group className="p-2" controlId={`ControlInput${node.id}`}>
                {node.attributes.label && (
                  <Form.Label>{node.attributes.label}</Form.Label>
                )}
                <Form.Control as="textarea" rows={3} />
                {node.attributes.helpText && (
                  <Form.Text className="text-muted">
                    {node.attributes.helpText}
                  </Form.Text>
                )}
              </Form.Group>
            );
          case "divider":
            return <hr />;
          default:
            return null;
        }
      }
    });
  };

  return (
    <>
      <Tree tree={tree} />
      <div className="my-5">
        <Button variant="secondary" className="me-2">Cancel</Button>
        <Button variant="primary">Save</Button>
      </div>
    </>
  );
};
