import React, { Component } from "react";
import { connect } from "react-redux";

class Form extends Component {
  state = {
    title: "",
    img: "",
    content: ""
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        Form
        <form onSubmit={e => e.preventDefault()}>
          <input name="title" type="text" placeholder="Enter Title" />
          <input name="img" type="text" placeholder="Enter Image URL" />
          <input name="content" type="text" placeholder="Enter Post Content" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id } = state;
  return { id };
}

export default connect(mapStateToProps)(Form);
