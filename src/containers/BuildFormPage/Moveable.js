import React, { Children, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { DragableItemTypes } from "../../utils/DragableItemTypes";
import { ArrowsMove, Trash3, Pencil } from "react-bootstrap-icons";

export const Moveable = (props) => {
  const { item, index, onMove, onDrop, onAction, readonly } = props;
  const ref = useRef(null);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: Object.values(DragableItemTypes),
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        // drop already handled on child
        return;
      }
      console.log("dropped", { id: item.id, type: item.type });
      if (!item.id) {
        // existing items handled in hover
        onDrop(item, props.item.parentId);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover: (item, monitor) => {
      const draggingItem = monitor.getItem();
      const currentItem = props.item;
      const hoverIndex = index;
      const dragIndex = item.index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      console.log(
        JSON.stringify({ dragIndex, hoverIndex, hoverActualY, hoverMiddleY })
      );
      if (currentItem.id === draggingItem.id) return;
      if (currentItem.parentId === draggingItem.parentId) {
        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      }

      if (draggingItem.id) {
        // new items handled in drop
        // console.log({ currentItem, draggingItem), Date.now());
        console.log("nove triggered >>>");
        onMove(draggingItem, currentItem);
      }
    },
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.type,
    item: { ...item, index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert("You noved $(item.type) into $(dropResult.name)!!!!!");
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const isActive = canDrop && isOver;
  let styles = { backgroundColor: "" };
  if (isActive) {
    styles.backgroundColor = "rgba(0, 255, 102, .5)"; // "green";
    styles.border = "1px solid #efefef";
  } else if (canDrop) {
    styles.backgroundColor = "#efefef";
    styles.border = "1px solid #efefef";
  }

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        border: "5px solid #efefef",
        borderRadius: "10px",
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        transform: "translate(0, 0)",
        opacity: isDragging ? "0" : "1",  
        ...styles,
      }}
    >
      <div style={{ textAlign: "right" }} className="pe-1">
        <ArrowsMove className="m-1" />
        {!readonly && (
          <Pencil
            className="m-1 "
            style={{ cursor: "pointer" }}
            onClick={() => onAction(item, "edit")}
          />
        )}

        <Trash3
          className="m-1"
          style={{ cursor: "pointer" }}
          onClick={() => onAction(item, "delete")}
        />
      </div>
      {Children.toArray(props.children)}
    </div>
  );
};
