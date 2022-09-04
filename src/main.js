import createElement from "./core/createElement";
import render from "./core/render";
const vApp = Object.create(null);
Object.assign(
  vApp,
  createElement("div", { id: "app" }, [
    createElement("h1", {}, ["Hello World"]),
    createElement("p", {}, ["This is a paragraph"]),
    createElement("ul", {}, [
      createElement("li", {}, ["Item 1"]),
      createElement("li", {}, ["Item 2"]),
      createElement("li", {}, ["Item 3"]),
    ]),
  ])
);

render(vApp, document.getElementById("app"));
