import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../../ducks/reducer";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      img: "",
      content: ""
    };
  }

  async componentDidMount() {
    let res = await axios.get("/api/auth/me");
    this.props.setUser(res.data);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = () => {
    const { title, img, content } = this.state;
    const { id } = this.props;
    axios
      .post("/api/posts/new", { id, title, img, content })
      .then(this.props.history.push("/dashboard"));
  };

  render() {
    return (
      <div>
        Form
        <form onSubmit={e => e.preventDefault()}>
          <input
            name="title"
            type="text"
            placeholder="Enter Title"
            onChange={e => this.handleChange(e)}
          />
          <input
            name="img"
            type="text"
            placeholder="Enter Image URL"
            onChange={e => this.handleChange(e)}
          />
          <input
            name="content"
            type="text"
            placeholder="Enter Post Content"
            onChange={e => this.handleChange(e)}
          />
          <button onClick={this.handleSubmit}>Post</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id } = state;
  return { id };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Form);
