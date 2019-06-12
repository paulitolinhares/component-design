import React from "react";
import UserForm from "./UserForm";
import { saveUser } from "../api/user";

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <UserForm onSubmit={saveUser} />
    </div>
  );
};

export default SignUpPage;
