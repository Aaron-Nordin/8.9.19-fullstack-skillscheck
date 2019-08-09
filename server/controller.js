// const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    // const user = await db.find_username([username]);
    // if (user.length > 0) {
    //   return res.status(400).send({ message: "Username in use." });
    // }
    const newUser = await db.add_user({ username, password }); // newUser: [{}]
    res.status(201).send(newUser);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const user = await db.find_username_and_password({ username, password });
    if (user.length === 0) {
      return res.status(400).send({ message: "Email not found" });
    }
    res.status(200).send(user);
  }
};
