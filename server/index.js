require("dotenv").config();
const controller = require("./controller");
const express = require("express");
const massive = require("massive");

const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();
app.use(express.json());

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

  app.post("/auth/register", controller.register)
  app.post("/login", controller.login)