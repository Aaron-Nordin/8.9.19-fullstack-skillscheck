import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import axios from "axios";

class Nav extends Component {
  componentDidMount() {
    // axios.get("/api/auth/me").then(res => {
    //   const { username, profile_pic } = res.data.user;
    //   this.props.setUser({ username, profile_pic });
    // });
  }

  temp = () => {
    axios.get("/api/auth/me").then(res => {
      console.log(res)
      const { username, profile_pic } = res.data;
      this.props.setUser({ username, profile_pic });
    });
  }

  render() {
    return (
      <div>
        {/* <h1>{JSON.stringify(this.props)}</h1> */}
        <button onClick={this.temp}>me</button>
        <h1>{this.props.username}</h1>
        <img src={this.props.profile_pic} alt="user pic" />
        <hr />
        <hr />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { username, profile_pic } = state;
  return { username, profile_pic };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Nav);
