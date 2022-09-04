const createElement = (tag, props, ...children) => {
  return {
    tag,
    props: props || {},
    children: children.flat() || [],
  };
};

export default createElement;
