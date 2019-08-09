import React, { Component } from "react";
import axios from "axios";

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

  registerUser = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/register", { username, password })
      .then(this.props.history.push("/dashboard"));
  };

  login = () => {
    const { username, password } = this.state;
    axios
      .post("/login", { username, password })
      .then(this.props.history.push("/dashboard"));
  };

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
          <button onClick={this.login}>Login</button>
          <button onClick={this.registerUser}>Register</button>
        </form>
      </div>
    );
  }
}
