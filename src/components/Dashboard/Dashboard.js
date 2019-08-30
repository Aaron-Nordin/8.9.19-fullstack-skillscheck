import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { logoutUser, setUser } from "../../ducks/reducer";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      inputValue: "",
      userpost: true,
      posts: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.getPosts();
    let res = await axios.get("/api/auth/me");
    this.props.setUser(res.data);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick() {
    this.setState({
      userpost: true ? false : true
    });
  }

  logout = () => {
    axios.delete("/api/auth/logout").then(() => {
      this.props.logoutUser();
      this.props.history.push("/");
    });
  };

  search = () => {
    this.getPosts();
  };

  reset = () => {
    this.setState({ search: "", userpost: true });
    this.getPosts();
  };

  getPosts = () => {
    const { search, userpost } = this.state;
    const { id } = this.props;
    // console.log("search:", search, "userpost:", userpost);
    parseInt(id, 10);
    axios
      .get(`/api/posts?userposts=${userpost}&search=${search}&id=${id}`)
      // &id=${id}
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  };

  render() {
    return (
      <div>
        <input
          name="search"
          type="text"
          onChange={e => this.handleChange(e)}
          value={this.state.search}
        />
        <button onClick={this.search}>Search</button>
        <button onClick={this.reset}>Reset</button>
        <Link to="/new">
          <button>New Post</button>
        </Link>
        <input
          type="checkbox"
          defaultChecked={true}
          onChange={() => this.handleClick()}
        />
        {this.state.posts.map(p => (
          <div key={p.id}>
            <Link to={`/post/${p.id}`}>
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
  { logoutUser, setUser }
)(Dashboard);
