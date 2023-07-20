// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../utils/CreateContext";
import Logout from "../pages/Logout";

const Header = () => {
  //* Context
  const { isAuthentication } = useContext(Context);

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>HOME</Link>
        <Link to={"/profile"}>Profile</Link>
        {!isAuthentication ? <Link to={"/login"}>Account</Link> : <Logout />}
      </article>
    </nav>
  );
};

export default Header;
