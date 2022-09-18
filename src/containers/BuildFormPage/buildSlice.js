import { createSlice } from "@reduxjs/toolkit";
import { Tree } from "../../utils/Tree";

const initialState = {
  items: [],
  tree: {
    id: "1",
    type: "root",
    children: [],
  },
};

export const buildSlice = createSlice({
  name: "build",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const { items } = state;
      const { item, parentId } = payload;
      const model = new Tree(items);
      model.addNode(item, parentId);

      state.items = model.items;
      state.tree = model.getUnflattenedTree();
    },

    moveItem: (state, { payload }) => {
      const { items } = state;
      const { draggingItem, dropItem } = payload;
      console.log({ draggingItem, dropItem });

      const model = new Tree(items);
      model.moveNode(draggingItem.id, dropItem.id);
      state.items = model.items;
      state.tree = model.getUnflattenedTree();
    },
    removeItem: (state, { payload }) => {
      const { items } = state;
      const { item } = payload;

      const model = new Tree(items);
      model.removeNode(item.id);

      state.items = model.items;
      state.tree = model.getUnflattenedTree();
    },
    configItem: (state, { payload }) => {
      const { items } = state;
      const { item } = payload;

      const model = new Tree(items);
      model.updateAttributes(item.id, item.attributes);

      state.items = model.items;
      state.tree = model.getUnflattenedTree();
    },
  },
});
// Action creators are generated for each case reducer function
export const { addItem, removeItem, moveItem, configItem } = buildSlice.actions;
export default buildSlice.reducer;
