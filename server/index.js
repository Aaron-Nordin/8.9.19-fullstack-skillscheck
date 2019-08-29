require("dotenv").config();
const controller = require("./controller");
const express = require("express");
const massive = require("massive");
const session = require("express-session")

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());

app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
      }
    })
  );  

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    app.listen(SERVER_PORT, () =>
      console.log(`Server ${SERVER_PORT} is aware`)
    );
  })
  .catch(err => {
    console.log("can't conect to db", err);
  });

  //---------------------ENDPOINTS----------------------------

  app.post("/api/auth/register", controller.register)
  app.post("/api/auth/login", controller.login)
  app.delete("/api/auth/logout", controller.logout)
  // app.get("/api/auth/me", controller.getMe)
  app.get("/api/auth/me", (req, res) => {
    console.log("inside", req.session)
  })
  app.get("/api/posts", controller.getPosts)
  app.get("/api/posts/:postid", controller.getPost)