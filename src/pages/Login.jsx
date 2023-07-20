// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { Context } from "../utils/CreateContext";
import { toast } from "react-hot-toast";
import { server } from "../utils/Url";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  //* Context
  const { setIsAuthentication, loading, setLoading } = useContext(Context);

  //* Navigator
  const navigator = useNavigate();

  //* Status use for Data store
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //* Form Handler
  const formHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //* loginHandler
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthentication(true);
      // console.log(isAuthentication);
      // console.log("login Page", isAuthentication);
      toast.success(data.message);
      // console.log(data);
      navigator("/");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthentication(false);
      // console.log("login Page", isAuthentication);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
          {/* Email Label */}
          <input
            type="text"
            name="email"
            placeholder="Please Enter Valid Email"
            onChange={formHandler}
            required
            autoComplete="email"
          />
          {/* Password Label */}
          <input
            type="password"
            name="password"
            placeholder="Please Enter Valid Password"
            onChange={formHandler}
            required
            autoComplete="password"
          />
          {/* Button */}
          <button className="btn" disabled={loading}>
            Login Now
          </button>
          <div>or</div>
          <Link to={"/register"}>Register</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
