const renderElement = ({ tag, props, children }) => {
  const $el = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach((key) => {
      const value = props[key];
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

const render = (vNode) => {
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }
  return renderElement(vNode);
};

export default render;
