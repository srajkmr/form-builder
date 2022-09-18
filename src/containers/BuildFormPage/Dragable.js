import React, { Children } from "react";
import { useDrag } from "react-dnd";

const Dragable = (props) => {
  const { item } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.type,
    item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`dragged item`, { item, m: props.item });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ opacity }}>
      {Children.toArray(props.children)}
    </div>
  );
};
export default Dragable;
