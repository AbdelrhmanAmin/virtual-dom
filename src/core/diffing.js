import render from "./render";
const isStringOrNumber = (value) =>
  typeof value === "string" || typeof value === "number";

const diff = (oldTree, newTree) => {
  if (!newTree) {
    return (node) => {
      node.remove();
      return;
    };
  }
  if (isStringOrNumber(oldTree) || isStringOrNumber(newTree)) {
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
    attributes(newNode);
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
    if (Object.keys(patches).length > 0) {
      for (const key of patches) {
        const value = patches[key];
        node.setAttribute(key, value);
      }
    }
    return node;
  };
};

const diffChildren = (oldChildren, newChildren) => {
  const parentPatches = [],
    childPatches = [];
  oldChildren.forEach((oldChild, i) => {
    const patch = diff(oldChild, newChildren[i]);
    childPatches.push(patch);
  });
  const theNewChildren = newChildren.slice(oldChildren.length);
  theNewChildren.forEach((newChild) => {
    parentPatches.push((node) => {
      node.appendChild(render(newChild));
      return node;
    });
  });
  return (parent) => {
    parent.childNodes.forEach((child, i) => {
      childPatches[i](child);
    });
    parentPatches.forEach((patch) => {
      patch(parent);
    });
    return parent;
  };
};

export default diff;
