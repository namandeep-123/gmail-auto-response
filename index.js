import dotenv from "dotenv";
dotenv.config();
import express from "express";

//db
import db from "./db.js";

//apis
import oauth2 from "./gmailOauth.js";

import("./autoResponse.js");

const app = express();
const port = process.env.PORT;

// Configurations
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.static("static"));

app.get("/login", async (req, res) => {
  const googleOAuth2Url = oauth2.getAuthUrl();
  res.render("login", { authUrl: googleOAuth2Url });
});

app.get("/gmail", async (req, res) => {
  const { code, scope } = req.query;

  if (!code || typeof code !== "string" || !scope || typeof scope !== "string")
    return res.sendStatus(401);

  const scopes = scope.split("%20");

  const googleUser = await oauth2.verifyGoogleAuthCode(code);
  if (!googleUser.success) return res.send("invalid request");

  const user = {
    tokens: googleUser,
    addedOn: new Date(),
    lastCheckedOn: new Date(),
  };
  db.users.push(user);
  db.save();

  res.send("success");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
  console.log(`http://localhost:${port}/login for login page`);
});
