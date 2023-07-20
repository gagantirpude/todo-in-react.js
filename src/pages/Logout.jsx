// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { server } from "../utils/Url";
import axios from "axios";
import { Context } from "../utils/CreateContext";

const Logout = () => {
  //* Context
  const { setIsAuthentication, setLoading, loading } = useContext(Context);

  //* Logout Handler
  const logoutHandler = async () => {
    setLoading(true);
    await axios
      .get(`${server}/users/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        // console.log(res.data);
        setIsAuthentication(false);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsAuthentication(true);
        setLoading(false);
      });
  };

  return (
    <button onClick={logoutHandler} disabled={loading} className="btn">
      Logout
    </button>
  );
};

export default Logout;
