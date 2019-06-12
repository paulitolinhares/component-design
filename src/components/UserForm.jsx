import React, { useState } from "react";
import Button from "./Button";

export default function UserForm({ onSubmit }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ username, password });
      }}
    >
      <label htmlFor="username">Username</label>
      <input
        type="text"
        value={username}
        onChange={e => setUserName(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button text="Submit" />
    </form>
  );
}
