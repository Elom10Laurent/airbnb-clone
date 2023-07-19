const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./src/models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = 3001;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "azugevfozajfeza34thiiu";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("Hello World!");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    res.json("not found");
  } else {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign(
        { 
          email: userDoc.email, 
          id: userDoc._id
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;

          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }  
  }
});

app.get("/profile",  (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json({name, email, _id});
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) =>{
  res.cookie('token', '', { sameSite: "none", secure: true }).json(true);
})
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});