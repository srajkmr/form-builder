import React, { Children, useRef } from "react";
import { useDrop } from "react-dnd";

import { DragableItemTypes } from "../../utils/DragableItemTypes";
import { DropCanvas } from "../../components/atoms";

export const DropZone = (props) => {
  const ref = useRef(null);
  const { parentId, onDrop } = props;

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: Object.values(DragableItemTypes),
    drop: (item, monitor) => {
      console.log("Item dropped!!", { item });
      onDrop(item, parentId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover: (item, monitor) => {
      const draggingItem = monitor.getItem();
      console.log(draggingItem, Date.now());
      // console.log(item, ref.current, Date.now());
    },
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "";
  if (isActive) {
    backgroundColor = "rgba(0, 255, 102, .5)"; // "green";
  } else if (canDrop) {
    backgroundColor = "#efefef";
  }
  drop(ref);

  return (
    <div ref={ref} style={{ height: "100%", minHeight: "100%" }}>
      <DropCanvas
        style={{ backgroundColor, height: "100%", minHeight: "100%" }}
      >
        {Children.toArray(props.children)}
      </DropCanvas>
    </div>
  );
};
