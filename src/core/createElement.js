const createElement = (tag, attributes, ...children) => {
  return {
    tag,
    attributes: attributes || {},
    children: children.flat() || [],
  };
};

export default createElement;
