import React from "react";

const Login = ({
  username,
  password,
  loginHandler,
  usernameChangeHandler,
  passwordChangeHandler,
}) => (
  <form onSubmit={loginHandler}>
    <div className="loginform">
      <label>Username</label>
      <input
        type="text"
        name="Username"
        id="username"
        value={username}
        onChange={usernameChangeHandler}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        value={password}
        name="Password"
        id="password"
        onChange={passwordChangeHandler}
      />
      <br />
      <button id="login-btn" className="btn">Login</button>
    </div>
  </form>
);

export default Login;
