import render from "./render";
const isStringOrNumber = (value) =>
  typeof value === "string" || typeof value === "number";

const diff = (oldTree, newTree) => {
  console.log({ oldTree, newTree });
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
  console.log(oldChildren, newChildren);
  const childPatches = [];
  oldChildren.forEach((oldChild, i) => {
    childPatches.push(diff(oldChild, newChildren[i]));
  });

  const additionalPatches = [];
  for (const additionalChild of newChildren.slice(oldChildren.length)) {
    additionalPatches.push(($node) => {
      $node.appendChild(render(newChildren));
      return $node;
    });
  }

  return ($parent) => {
    // since childPatches are expecting the $child, not $parent,
    // we cannot just loop through them and call patch($parent)
    $parent.childNodes.forEach(($child, i) => {
      childPatches[i]($child);
    });

    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
};

export default diff;
