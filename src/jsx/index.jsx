const React = require("react");
React;
const ReactDom = require("react-dom");
const Game = require("./Game.jsx");

let run = () => {
  ReactDom.render(<Game.Game />, document.querySelector("#game"));
};

exports.run = run;
