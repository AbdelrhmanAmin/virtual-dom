const renderElement = ({ tag, attributes, children }) => {
  const $el = document.createElement(tag);
  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      const value = attributes[key];
      if (key === "style") {
        Object.keys(value).forEach((styleKey) => {
          $el.style[styleKey] = value[styleKey];
        });
      } else if (key === "className") {
        $el.className = value;
      } else {
        $el.setAttribute(key, value);
      }
    });
  }
  if (children) {
    children.forEach((child) => {
      $el.appendChild(render(child));
    });
  }
  return $el;
};

const render = (vNode, target) => {
  let node;
  if (typeof vNode === "string" || typeof vNode === "number") {
    node = document.createTextNode(vNode);
  } else {
    node = renderElement(vNode);
  }
  if (target) {
    target.replaceWith(node);
  }
  return node;
};

export default render;
