class Tree {
  constructor(items) {
    if (items !== null && items.length > 0) {
      this.items = items;
    } else {
      this.items = [];
      this.items.push(createNode("root"));
    }
  }

  getNodeById(id) {
    return this.items.find((node) => node.id === id);
  }

  getChildren(id) {
    return this.items.filter((node) => node.parentId === id);
  }

  removeNodeById(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  addNode(item, parentId) {
    const { type, attributes } = item;
    const idOfParent =
      parentId === undefined || parentId === null ? "1" : parentId;
    if (type === "table") {
      this._addTable(idOfParent, attributes);
    } else {
      let parent = this.getNodeById(idOfParent);
      let node = createNode(type, attributes);
      node.parentId = parent.id;
      this.items.push(node);
    }
  }

  moveNode(nodeId, newParentId) {
    let node = this.getNodeById(nodeId);
    let newParent = this.getNodeById(newParentId);
    node.parentId = newParent.id;
  }

  removeNode(nodeId) {
    let node = this.getNodeById(nodeId);
    this.removeNodeRecursively(node);
  }

  removeNodeRecursively(node) {
    let children = this.getChildren(node.id);
    this.removeNodeById(node.id);
    if (!children || children.length <= 0) {
      return;
    }
    children.forEach((child) => {
      this.removeNodeRecursively(child);
    });
  }

  updateAttributes(nodeId, attributes) {
    let node = this.getNodeById(nodeId);
    node.attributes = attributes;
  }

  // create tree structure from flat list
  getUnflattenedTree() {
    let hashMap = {},
      tree = {};

    // create id as key map
    this.items.forEach((item) => {
      const id = item.id;
      if (!hashMap.hasOwnProperty(id)) {
        hashMap[id] = Object.assign({}, item);
        hashMap[id].children = [];
      }
    });

    for (var id in hashMap) {
      if (hashMap.hasOwnProperty(id)) {
        let item = hashMap[id];

        if (item.parentId) {
          var parentId = item.parentId;
          hashMap[parentId].children.push(item);
        } else {
          tree = item;
        }
      }
    }

    return tree;
  }

  _addTable(parentId, attributes) {
    let parent = this.getNodeById(parentId);
    let table = createNode("table", attributes, parent.id);
    this.items.push(table);

    let tableRow1 = createNode("row", {}, table.id);
    this.items.push(tableRow1);
    let tableCell1 = createNode("cell", {}, tableRow1.id);
    this.items.push(tableCell1);
    let tableCell2 = createNode("cell", {}, tableRow1.id);
    this.items.push(tableCell2);

    let tableRow2 = createNode("row", {}, table.id);
    this.items.push(tableRow2);
    let tableCell3 = createNode("cell", {}, tableRow2.id);
    this.items.push(tableCell3);
    let tableCell4 = createNode("cell", {}, tableRow2.id);
    this.items.push(tableCell4);
  }
}

const createNode = (type, attributes = {}, parentId = null) => {
  let node = { type, attributes, parentId };
  node.id = type === "root" ? "1" : `id-${Math.random().toString(16).slice(2)}`;
  return node;
};

export { Tree };
