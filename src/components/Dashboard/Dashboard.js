import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { logoutUser } from "../../ducks/reducer";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      checkbox: true,
      posts: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick() {
    this.setState({
      checkbox: true ? false : true
    });
  }

  logout = () => {
    axios.delete("/api/auth/logout").then(() => {
      this.props.logoutUser();
      this.props.history.push("/");
    });
  };

  getPosts = () => {
    axios.get("/api/posts").then(res => {
      this.setState({
        posts: res.data
      });
    });
  };

  render() {
    return (
      <div>
        Dashboard
        <input type="text" onChange={e => this.handleChange(e)} />
        <button>Search</button>
        <button>Reset</button>
        <input type="checkbox" checked onChange={() => this.handleClick()} />
        {this.state.posts.map(p => (
          <div key={p.id}>
            <Link to={`/api/posts/${p.id}`}>
              <div className="post-info">
                <hr />
                <h2>{p.title}</h2>
                <h5>{p.username}</h5>
                <img src={p.profile_pic} alt="profile pic" />
              </div>
            </Link>
          </div>
        ))}
        <button onClick={this.logout}>Logout</button>
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
  { logoutUser }
)(Dashboard);
