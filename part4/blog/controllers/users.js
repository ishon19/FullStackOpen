const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.password || !body.username) {
      return response
        .status(400)
        .send({ error: "username or passoword either missing or invalid" })
        .end();
    }

    //check if the password is valid
    if (body.password && body.password.length < 3) {
      return response
        .status(400)
        .send({ error: "Password must be at least 3 characters long" })
        .end();
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

module.exports = usersRouter;
