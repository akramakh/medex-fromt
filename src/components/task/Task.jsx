import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./task.css";

class Task extends Component {
  state = {};

  checkedClass = () => {
    let classes = "fa fa-check-square";
    !this.props.done ? (classes += "-o") : (classes += "");
    return classes;
  };

  completedClass = () => {
    let classes = "item";
    this.props.expired ? (classes = "item expired") : (classes += "");
    this.props.done ? (classes = "item completed") : (classes += "");
    return classes;
  };

  render() {
    return (
      <div className={this.completedClass()}>
        <div className="info">
          <a>
            <h3>{this.props.title}</h3>
          </a>
          <span>{this.props.date}</span>
        </div>
        <div className="options">
          <i
            onClick={this.props.funcs.checked}
            className={this.checkedClass()}
          />
        </div>
      </div>
    );
  }
}

export default Task;
