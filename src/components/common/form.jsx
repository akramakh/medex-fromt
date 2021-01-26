import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const scheme = { [name]: this.scheme[name] };
    const { error } = Joi.validate(obj, scheme);

    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.scheme, options);
    if (!error) return null;

    const errors = {};
    error.details.map(err => {
      errors[err.path[0]] = err.message;
    });

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log(errors);

    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    let { data } = this.state;
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderSubmitButton = (label = "Submit") => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name = "name", label = "Label", type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        lable={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
