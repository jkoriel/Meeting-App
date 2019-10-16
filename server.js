const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8000;

const users = require("./routes/users");
const posts = require("./routes/appointments");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", users);
app.use("/appointments", posts);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
