import React, { Component } from "react";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    return (
        <div>
            <h1>{this.props.username}</h1>
            <img src={this.props.profile_pic} alt="user pic"/>
        </div>
    )
  }
}

function mapStateToProps(state) {
  const { username, profile_pic } = state;
  return { username, profile_pic };
}

export default connect(mapStateToProps)(Nav);
