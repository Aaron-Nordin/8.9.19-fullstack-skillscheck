import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  state = {
    title: "",
    img: "",
    content: "",
    username: ""
  };

  componentDidMount() {
    axios.get(`/api/posts/${this.props.match.params.postid}`).then(res => {
      // console.log(res.data);
      const { title, img, content, username } = res.data[0];
      this.setState({ title, img, content, username });
    });
  }

  render() {
    return (
      <div>
        Post
        <img src={this.state.img} alt="profile pic" />
        <h1>{this.state.username}</h1>
        <hr />
        <h3>{this.state.title}</h3>
        <h5>{this.state.content}</h5>
      </div>
    );
  }
}
