// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../utils/CreateContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../utils/Url";
import TodoItem from "../components/TodoItem";

const Home = () => {
  //* Context
  const { isAuthentication, setIsAuthentication, setUser } =
    useContext(Context);

  //* Navigator
  const navigate = useNavigate();

  //* useStatus
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //* Refresh
  const [refresh, setRefresh] = useState(false);

  //* Button Enable or Disable Button
  const [loading, setLoading] = useState(false);

  //* Store Data form Database
  const [tasks, setTasks] = useState([]);

  //* Post Create Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true); //disable button
      const { data } = await axios.post(
        `${server}/tasks/create`,
        {
          title,
          description,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setDescription("");
      setTitle("");
      toast.success(data.message);
      setRefresh((prev) => !prev);
      setIsAuthentication(true);
      setLoading(false);
      setUser(data.data);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthentication(false);
      setLoading(false);
    }
  };

  //* Use Effect
  useEffect(() => {
    // Todo : Condition
    if (isAuthentication) {
      axios
        .get(`${server}/tasks/read`, { withCredentials: true })
        .then((e) => setTasks(e.data.data))
        .catch((error) => console.log(error.response.data.message));
    } else {
      navigate("/login");
    }

    return () => {
      axios
        .get(`${server}/users/profile`, { withCredentials: true })
        .then((res) => {
          // toast.success(res.data.message);
          setUser(res.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  //* Update Handler
  const updateHandler = async (id) => {
    // setLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {
          // Data that we want to update
        },
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  //* Delete Handler
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //*  if user not login then goto login page
  if (!isAuthentication) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Please Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoComplete="title"
          />
          {/* Description */}
          <input
            type="text"
            name="description"
            placeholder="Please Enter Title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            autoComplete="description"
          />
          {/* Button */}
          <button disabled={loading} className="btn">
            Add Task
          </button>
        </form>
      </section>
      <div>
        <div>
          {/* <h1 style={{ textAlign: "center" }}>My Task</h1> */}
          <section className="todo_Container">
            <h1>My Task</h1>
            {tasks.map((task) => (
              <TodoItem
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                updateHandler={updateHandler}
                isCompleted={task.isCompleted}
                deleteHandler={deleteHandler}
              />
            ))}
          </section>
        </div>

        {/* <h1>{user.name}</h1> */}
        {/* </section> */}
      </div>
    </div>
  );
};

export default Home;
