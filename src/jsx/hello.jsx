const React = require("react");

class HelloWorld extends React.Component{
  render(){
    return <span>Hello {this.props.name}!</span>;
  }
}

exports.HelloWorld = HelloWorld;