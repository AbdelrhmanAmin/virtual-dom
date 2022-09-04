import render from "./render";

const diff = (oldTree, newTree) => {
  if (!newTree) {
    return (node) => {
      node.remove();
      return;
    };
  }
  if (typeof oldTree === "string" || typeof newTree === "string") {
    if (oldTree === newTree) {
      return (node) => node;
    } else {
      return (node) => {
        const newNode = render(newTree, node);
        return newNode;
      };
    }
  }
  if (oldTree.tag !== newTree.tag) {
    return (node) => {
      const newNode = render(newTree, node);
      return newNode;
    };
  }
  const attributes = diffAttributes(oldTree.attributes, newTree.attributes);
  const children = diffChildren(oldTree.children, newTree.children);
  return (node) => {
    const newNode = render(newTree, node);
    props(newNode);
    children(newNode);
    return newNode;
  };
};

const diffAttributes = (oldAttributes, newAttributes) => {
  const patches = {};
  for (let key in newAttributes) {
    if (oldAttributes[key] !== newAttributes[key]) {
      patches[key] = newAttributes[key];
    }
  }
  return (node) => {
    for (const key of patches) {
      const value = patches[key];
      node.setAttribute(key, value);
    }
    return node;
  };
};

const diffChildren = (oldChildren, newChildren) => {
  const children = [];
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const oldChild = oldChildren[i];
    const diffFn = diff(oldChild, newChild);
    if (diffFn) {
      children.push(diffFn);
    }
  }
  return (node) => {
    for (const child of children) {
      child(node);
    }
    return node;
  };
};

export default diff;
