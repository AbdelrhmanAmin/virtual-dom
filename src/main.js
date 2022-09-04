import createElement from "./core/createElement";
import diff from "./core/diffing";
import render from "./core/render";

const createApp = (count) => {
  const vApp = Object.create(null);
  Object.assign(
    vApp,
    createElement("div", { id: "app" }, [
      createElement("h1", {}, ["Hello World"]),
      createElement("p", {}, `This is a ${count}`),
      createElement("ul", {}, [
        createElement("li", {}, count),
        createElement("li", {}, ["Item"]),
        createElement("li", {}, ["Item"]),
      ]),
    ])
  );
  return vApp;
};
const oldApp = createApp(1);
let app = render(oldApp, document.getElementById("app"));

setTimeout(() => {
  let newApp = createApp(2);
  const patch = diff(oldApp, newApp);
  app = patch(app);
  console.log(patch);
}, 1000);
