// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../utils/CreateContext";
// import { server } from "../utils/Url";

const Profile = () => {
  //* Context
  const { isAuthentication, user } = useContext(Context);

  //* if User not Authorized then navigate to login
  if (!isAuthentication) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Render other user details here */}
    </div>
  );
};

export default Profile;
