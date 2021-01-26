import React, { Component } from "react";

const Input = ({ name, lable, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{lable}</label>
      <input id={name} name={name} className="form-control" {...rest} />
      {error && <span className="text text-danger">{error}</span>}
    </div>
  );
};

export default Input;
