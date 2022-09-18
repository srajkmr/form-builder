import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  ValidateButton,
  MenuHeading,
  DragItem,
  Sidebar,
} from "../../components/atoms";
import { ConfirmModal, FieldConfigForm } from "../../components/molecules";

import { DragableItemTypes } from "../../utils/DragableItemTypes";
import Dragable from "./Dragable";
import { DropZone } from "./DropZone";
import { RenderForm } from "./RenderForm";
import { Preview } from "./Preview";
import { addItem, moveItem, removeItem, configItem } from "./buildSlice";

const BuildFormPage = (props) => {
  const { tree } = useSelector((st) => st.build);
  const dispatch = useDispatch();
  console.log({ tree });

  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const onMoveItem = (draggingItem, dropItem) => {
    dispatch(moveItem({ draggingItem, dropItem }));
  };

  const onDropItem = (item, parentId) => {
    dispatch(addItem({ item, parentId }));
  };

  const onAction = (item, action) => {
    setActiveItem(item);
    if (action === "delete") {
      setShowDeleteConfirm(true);
    } else if (action === "edit") {
      setShowConfig(true);
    }
  };

  const onConfigFormSubmit = (values) => {
    let item = { ...activeItem };
    let attributes = { ...item.attributes };
    attributes.label = values.label;
    attributes.helpText = values.helpText;
    attributes.required = values.required;
    attributes.type = values.type;
    item.attributes = attributes;
    console.log(item);
    dispatch(configItem({ item }));
    setShowConfig(!showConfig);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Container fluid>
          <Row>
            <Sidebar xs lg="3">
              <div style={{}}>
                <div className="mt-4 mb-4">
                  <ValidateButton onClick={() => setShowPreview(!showPreview)}>
                    {showPreview ? "Build Form" : "Preview"}
                  </ValidateButton>
                </div>
                <div
                  className="vstack gap-3"
                  style={{ opacity: showPreview ? "0" : "1" }}
                >
                  {" "}
                  <MenuHeading>Cell Layout</MenuHeading>
                  <Dragable
                    item={{
                      type: DragableItemTypes.TABLE,
                      attributes: { label: "Table" },
                    }}
                  >
                    <DragItem>Table</DragItem>
                  </Dragable>
                  <MenuHeading>Form Components</MenuHeading>
                  <Dragable
                    item={{
                      type: DragableItemTypes.INPUT,
                      attributes: { label: "Form Input", type: "text" },
                    }}
                  >
                    <DragItem>Input</DragItem>
                  </Dragable>
                  <Dragable
                    item={{
                      type: DragableItemTypes.CHECKBOX,
                      attributes: { label: "Form Option Input" },
                    }}
                  >
                    <DragItem>Checkbox</DragItem>
                  </Dragable>
                  <Dragable
                    item={{
                      type: DragableItemTypes.INPUT,
                      attributes: { label: "File Input", type: "file" },
                    }}
                  >
                    <DragItem>File Uploader</DragItem>
                  </Dragable>
                  <Dragable
                    item={{
                      type: DragableItemTypes.TEXT,
                      attributes: { label: "Free Text" },
                    }}
                  >
                    <DragItem>Text</DragItem>
                  </Dragable>
                  <Dragable
                    item={{
                      type: DragableItemTypes.DIVIDER,
                      attributes: {},
                    }}
                  >
                    <DragItem>Divider</DragItem>
                  </Dragable>
                </div>
              </div>
            </Sidebar>
            <Col xs lg="9" className="ms-sm-auto">
              {showPreview && <Preview tree={tree.children} />}
              {!showPreview && (
                <>
                  <h3 className="my-4">Drop &amp; Create</h3>
                  {tree && tree.children.length ? (
                    <>
                      <RenderForm
                        tree={tree.children}
                        onMove={onMoveItem}
                        onDrop={onDropItem}
                        onAction={onAction}
                      />
                      <DropZone name="drop-zone" onDrop={onDropItem}>
                        Drop here
                      </DropZone>
                    </>
                  ) : (
                    <DropZone name="drop-zone" onDrop={onDropItem}>
                      Drop here
                    </DropZone>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </DndProvider>

      {showDeleteConfirm && (
        <ConfirmModal
          message={`Are you sure you want to delete '${
            activeItem && activeItem.attributes.label
          }'?`}
          onCancel={() => setShowDeleteConfirm(!showDeleteConfirm)}
          onConfirm={() => {
            dispatch(removeItem({ item: activeItem }));
            setShowDeleteConfirm(!showDeleteConfirm);
          }}
        />
      )}

      {showConfig && (
        <FieldConfigForm
          item={activeItem}
          onSubmit={onConfigFormSubmit}
          onClose={() => setShowConfig(!showConfig)}
        />
      )}
    </>
  );
};

export default BuildFormPage;
