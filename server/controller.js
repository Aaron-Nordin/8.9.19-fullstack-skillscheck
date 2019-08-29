module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    // const user = await db.find_username([username]);
    // if (user.length > 0) {
    //   return res.status(400).send({ message: "Username in use." });
    // }
    // const user = await db.add_user({ username, password }).then(() => {
    //   req.session.user = user[0];
    //   req.status(200).send({ user: req.session.user });
    // });
    const user = await db.add_user({ username, password });
    req.session.user = user[0];
    req.session.userid = user[0].id;
    return res.status(200).send({ user: req.session.user });
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const user = await db.find_username_and_password({ username, password });
    if (user.length === 0) {
      return res.status(400).send({ message: "Login info incorrect" });
    }
    req.session.user = user[0];
    req.session.userid = user[0].id;
    return res.status(200).send({ user: req.session.user });
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Logged out" });
  },

  // getPosts: async (req, res) => {
  //   const db = req.app.get("db");
  //   // const posts = await db.get_posts();
  //   let posts = [];
  //   if (req.query.userpost === "true") {
  //     posts = await db.get_user_posts([req.session.userid]);
  //   } else if (req.query.userpost === "false") {
  //     posts = await db.get_posts();
  //   } else posts = await db.get_posts();
  //   res.status(200).send(posts);
  // },

  getPosts: async (req,res) => {
    const db = req.app.get('db')
    const userPost = req.query.userposts === 'true' ? true: false ;
    const search = req.query.search ? req.query.search :'';
    let userId = req.query.id
    userId = +userId
    // console.log({userPost, search, userId})
    if(userPost && search !== ''){
        // console.log('1')
        const posts = await db.search_by_title(['%' + search + '%'])
        res.status(200).send(posts)
    }
    else if(!userPost && search === ''){
        // console.log('2')
        const posts = await db.search_title_not_user([userId])
        res.status(200).send(posts)
    }
    else if(!userPost && search){
        // console.log('3')
        const posts = await db.search_notuser_posts([userId, '%' + search + '%'])
        res.status(200).send(posts)
    }
    else if(userPost && !search){
        // console.log('4')
        const posts = await db.get_all_posts()
        res.status(200).send(posts)
    }
    else if(!userPost && !search){
        // console.log('5')
        const posts = await db.get_all_posts()
        res.status(200).send(posts)
    }
},

  getPost: async (req, res) => {
    const db = req.app.get("db");
    // console.log(req);
    const { postid } = req.params;
    const post = await db.get_post([postid]);
    console.log(post);
    // console.log(post);
    // const { title, img, content, username, profile_pic } = post;
    // res.status(200).send({ title, img, content, username, profile_pic });
    return res.status(200).send(post);
  }
};
