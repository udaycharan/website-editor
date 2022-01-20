import React from "react";

export default function Form1() {
  return (
    <form>
      <h3>Login</h3>
      <input type="text" name="username" id="form-username" />
      <input type="password" name="password" id="form-password" />
      <button>Login</button>
    </form>
  );
}
