import React from "react";
import UserForm from "./UserForm";
import { editUser } from "../api/user";

const EditPage = () => {
  return (
    <div>
      <h1>Edit</h1>
      <UserForm onSubmit={editUser} />
    </div>
  );
};

export default EditPage;
