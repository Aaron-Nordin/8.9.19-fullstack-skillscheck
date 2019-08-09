import React, { Component } from "react";

export default class Auth extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        Auth
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={e => this.handleChange(e)}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={e => this.handleChange(e)}
          />
        </form>
      </div>
    );
  }
}
