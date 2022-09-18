class TreeModel {
  constructor(tree) {
    this.tree = tree;
  }
  findNodeById(id) {
    if (this.tree["id"] === id) return new Node(this.tree);
    const stack = [this.tree.children[0]];
    while (stack.length) {
      const node = stack.shift();
      if (node["id"] === id) return new Node(node);
      node.children && stack.push(...node.children);
    }
    return null;
  }
  addChildren(node, parentId) {
    const parent = this.findNodeById(parentId);
    if (parent) {
      parent.children = parent.children || [];
      this._addId(node, parentId);
      parent.children.push(node);
    }
    return this.tree;
  }
  moveChildren(node, destNode) {
    const newParent = this.findNodeById(destNode.parentId);
    const currenParent = this.findNodeById(node.parentId);
    const newIndex = newParent.childIndex(destNode);
    currenParent.removeChild(node);
    newParent.addChild(node, newIndex);
  }
  moveChildren_old(node, destNode) {
    const newParent = this.findNodeById(destNode.parentId);
    const currentParent = this.findNodeById(node.parentId);
    if (currentParent && newParent) {
      const index = currentParent.children.findIndex(
        (child) => child.id === node.id
      );
      const newIndex = newParent.children.findIndex(
        (child) => child.id === destNode.id
      );

      if (index > 0) {
        currentParent.children.splice(index, 1);
        newParent.children = newParent.children || [];
        let newNode = { parentId: newParent.id, ...node };
        newParent.children.splice(newIndex, 0, newNode);
      }
    }
    return this.tree;
  }
}

class Node {
  constructor(node) {
    this.node = node;
  }
  childIndex(child) {
    if (!this.hasChildren()) {
      return -1;
    }
    return this.node.children.findIndex((item) => child.id === item.id);
  }
  isLeaf() {
    return !this.node.children || this.node.children.length === 0;
  }
  hasChildren() {
    return !this.isLeaf();
  }
  isValidChildIndex(index) {
    if (this.hasChildren() && index >= 0 && index < this.node.children.length) {
      return true;
    }
    return false;
  }
  addChild(child, index = -1) {
    this.node.children = this.node.children || [];
    const insertIndex = this.isValidChildIndex(index)
      ? index
      : this.node.children.length;

    if (!child.id) {
      initNode(child, this.node.id);

      this.node.children.splice(insertIndex, 0, child);
    } else {
      this.node.children.splice(insertIndex, 0, {
        ...child,
        parentId: this.node.id,
      });
      return this;
    }
  }
  removeChild(child) {
    const index = this.childIndex(child);
    this.removeChildByIndex(index);
  }
  removechildByIndex(index) {
    if (this.isvalidchildIndex(index)) {
      return false;
    }
    this.node.children.splice(index, 1);
    return true;
  }
}

const initNode = (node, parentId) => {
  if (!node.id) {
    node.id = `id-${Math.random().toString(16).slice(2)}`;
  }
  node.parentId = parentId;
  if (node.children) {
    node.children.forEach((child) => {
      initNode(child, node.id);
    });
  }
};
export { TreeModel, Node, initNode };
