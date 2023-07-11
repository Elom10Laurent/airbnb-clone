const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./src/models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const app = express();
const port = 3001;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'azugevfozajfeza34thiiu';

app.use(express.json());
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
    const passOk = bcrypt.compareSync(password, userDoc.password)
      
    if (passOk) {
      jwt.sign({ email: userDoc.email, id: userDoc.id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;

        res.cookie('token', token, { sameSite: "none", secure: true }).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  }
});

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
