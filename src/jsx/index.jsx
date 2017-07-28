const React = require("react");
React;
const ReactDom = require("react-dom");
const hello = require("./hello.jsx");

let run = () => {
  ReactDom.render(<hello.HelloWorld name="react" />, document.querySelector("#root"));
};

exports.run = run;
