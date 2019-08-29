module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const user = await db.add_user({ username, password });
    req.session.user = user[0];
    req.session.userid = user[0].id;
    res.status(200).send({ user: req.session.user });
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const user = await db.find_username_and_password({ username, password });
    if (user.length === 0) {
      return res.status(400).send({ message: "Login info incorrect" });
    }
    console.log(user)
    req.session.user = user[0];
    // req.session.userid = user[0].id;
    console.log("loginsession", req.session);
    res.status(200).send({ user: req.session.user });
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Logged out" });
  },

  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const userPost = req.query.userposts === "true" ? true : false;
    const search = req.query.search ? req.query.search : "";
    // let userId = req.query.id
    let userId = req.session.userid;
    userId = +userId;
    // console.log({userPost, search, userId})
    if (userPost && search !== "") {
      console.log("1");
      const posts = await db.search_by_title(["%" + search + "%"]);
      res.status(200).send(posts);
    } else if (!userPost && search === "") {
      console.log("2");
      const posts = await db.search_title_not_user([userId]);
      res.status(200).send(posts);
    } else if (!userPost && search) {
      console.log("3");
      const posts = await db.search_notuser_posts([userId, "%" + search + "%"]);
      res.status(200).send(posts);
    } else if (userPost && !search) {
      console.log("4");
      const posts = await db.get_all_posts();
      res.status(200).send(posts);
    } else if (!userPost && !search) {
      console.log("5");
      const posts = await db.get_all_posts();
      res.status(200).send(posts);
    }
  },

  getPost: async (req, res) => {
    const db = req.app.get("db");
    // console.log(req);
    const { postid } = req.params;
    const post = await db.get_post([postid]);
    // console.log(post);
    // console.log(post);
    // const { title, img, content, username, profile_pic } = post;
    // res.status(200).send({ title, img, content, username, profile_pic });
    res.status(200).send(post);
  },

  getMe: async (req, res) => {
    console.log("reqsession", req.session);
    const db = req.app.get("db");
    const { user } = req.session;
    console.log("user", user);
    const userResult = await db.get_user_by_id([user.id]);
    console.log(userResult);
    res.status(200).send(userResult[0]);
  }
};
