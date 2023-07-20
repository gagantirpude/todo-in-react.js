// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../utils/Url";
import { Context } from "../utils/CreateContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  //* Context
  const { isAuthentication, setIsAuthentication, loading, setLoading } =
    useContext(Context);

  //* Navigation use to Navigate page
  const navigator = useNavigate();

  //* Status
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  //* Form Handler
  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //*
  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name: form.name,
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
      setIsAuthentication(true); //* user Authentication
      // console.log("register Page", isAuthentication);
      navigator("/login");
      toast.success(data.message);
      //   console.log(data);
      setLoading(false);
    } catch (error) {
      setIsAuthentication(false); //* user Not Authentication
      // console.log("register Page", isAuthentication);
      navigator("/login");
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  //* if User Not Authenticated
  if (isAuthentication) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <section>
        <div>{/* <h1>Register</h1> */}</div>
        <form onSubmit={registerHandler}>
          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={formHandler}
            placeholder="Please Enter Name"
            required
            autoComplete="name"
          />
          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={formHandler}
            placeholder="Please Enter Email"
            required
            autoComplete="email"
          />
          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={formHandler}
            placeholder="Please Enter Password"
            required
            autoComplete="password"
          />
          {/*  */}
          <button className="btn" disabled={loading}>
            Register Now
          </button>
          <div>or</div>
          <Link to={"/login"}>Login</Link>
        </form>
      </section>
      <section>{/* <h1>{form.name}</h1> */}</section>
    </div>
  );
};

export default Register;
