const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  const isPasswordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!user || !isPasswordCorrect) {
    return response.status(401).json({
      error: "Invalid username or password",
    });
  }

  const tokenUser = {
    username: user.username,
    id: user._id,
  };

  // eslint-disable-next-line no-undef
  const token = jwt.sign(tokenUser, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
