import React from "react";
import { Form } from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import { DropZone } from "./DropZone";
// import Dragable from "./Dragable";
import { Moveable } from "./Moveable";
import { Table } from "../../components/atoms";

export const RenderForm = (props) => {
  const { tree, onMove, onDrop, onAction } = props;
  if (!tree) {
    return null;
  }

  const Tree = ({ tree }) => {
    return tree.map((node, index) => {
      if (node.children && node.children.length > 0) {
        switch (node.type) {
          case "table":
            return (
              <Moveable
                item={node}
                index={index}
                key={`table${node.id}`}
                onMove={onMove}
                onDrop={onDrop}
                onAction={onAction}
                readonly={true}
              >
                <Table>
                  <Tree tree={node.children} />
                </Table>
              </Moveable>
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
            return (
              <div key={`cell${node.id}`} style={{ width: "50%" }}>
                <DropZone
                  name={`cell${node.id}`}
                  parentId={node.id}
                  onDrop={onDrop}
                >
                  Drop here{" "}
                </DropZone>
              </div>
            );
          case "input":
            return (
              <Moveable
                item={node}
                index={index}
                key={`input${node.id}`}
                onMove={onMove}
                onDrop={onDrop}
                onAction={onAction}
              >
                <Form.Group
                  className="p-2"
                  controlId={`ControlInput${node.id}`}
                >
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
              </Moveable>
            );
          case "checkbox":
            return (
              <Moveable
                item={node}
                index={index}
                key={`input${node.id}`}
                onMove={onMove}
                onDrop={onDrop}
                onAction={onAction}
              >
                <Form.Group
                  className="p-2"
                  controlId={`ControlInput${node.id}`}
                >
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
              </Moveable>
            );
          case "text":
            return (
              <Moveable
                item={node}
                index={index}
                key={`input${node.id}`}
                onMove={onMove}
                onDrop={onDrop}
                onAction={onAction}
              >
                <Form.Group
                  className="p-2"
                  controlId={`ControlInput${node.id}`}
                >
                  {node.attributes.label && (
                    <Form.Label>
                      {node.attributes.label}{" "}
                      {node.attributes.required && (
                        <Asterisk size={8} style={{ color: "red" }} />
                      )}
                    </Form.Label>
                  )}
                  <Form.Control as="textarea" rows={3} />
                  {node.attributes.helpText && (
                    <Form.Text className="text-muted">
                      {node.attributes.helpText}
                    </Form.Text>
                  )}
                </Form.Group>
              </Moveable>
            );
          case "divider":
            return (
              <Moveable
                item={node}
                index={index}
                key={`divider${node.id}`}
                onMove={onMove}
                onDrop={onDrop}
                onAction={onAction}
                readonly={true}
              >
                <hr />
              </Moveable>
            );
          default:
            return null;
        }
      }
    });
  };

  return <Tree tree={tree} />;
};
