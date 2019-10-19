const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8000;
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const { Model } = require("objection");

const users = require("./routes/users");
const appointments = require("./routes/appointments");
const knex = require("./db/knex");
const session = require("express-session");

Model.knex(knex);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", users);
app.use("/appointments", appointments);

app.keys = ["super-secret-key"];
app.use(
  session({
    secret: "unicorn",
    resave: false,
    saveUninitialized: true,
    unset: "destroy"
  })
);

app.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return knex("users")
    .where({ id })
    .first()
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true
    },
    (email, password, done) => {
      knex("users")
        .where({ email })
        .first()
        .then(user => {
          if (!user) return done(null, true);
          if (password === user.password) {
            return done(null, user);
          } else {
            return done(null, true);
          }
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/login", function(req, res) {
  res.render("login");
});
app.post("/login", passport.authenticate("local"), function(req, res) {
  res.redirect("/users/" + req.user.id);
});

app.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/login");
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
