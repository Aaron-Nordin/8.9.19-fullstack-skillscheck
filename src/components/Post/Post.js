import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  state = {
    title: "",
    img: "",
    content: "",
    username: "",
    profile_pic: ""
  };

  componentDidMount() {
    axios.get(`/api/posts/${this.props.match.postid}`).then(res => {
      console.log(res.data);
      const { title, img, content, username, profile_pic } = res.data;
      this.setState({ title, img, content, username, profile_pic });
    });
  }

  render() {
    return (
      <div>
        Post
        <img src={this.state.profile_pic} alt="profile pic" />
        <h1>{this.state.username}</h1>
        <hr />
        <h3>{this.state.title}</h3>
        <h5>{this.state.content}</h5>
      </div>
    );
  }
}
