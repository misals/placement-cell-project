const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./config/mongoose");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static('./assets'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// used for sessions
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport");

const MongoStore = require("connect-mongo");

app.use(cookieParser());

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo-store is used to store session cookies in database
app.use(
  session({
    name: "placement-cell",
    secret: "asewe",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://Suraj-Misal:12345@codeial-blog-project.ozufbbw.mongodb.net/test?retryWrites=true&w=majority",
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

// using express routers
app.use(require("./routes"));

// using bodyParser
app.use(bodyParser.json());

// listening to the port 8000;
app.listen(port, (err) => {
  if (err) {
    console.log("error in starting the server", err);
    return;
  }
  console.log("server is succesfully running on port 8000");
});
