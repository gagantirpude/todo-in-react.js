/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const TodoItem = ({
  id,
  title,
  description,
  updateHandler,
  isCompleted,
  deleteHandler,
}) => {
  return (
    <div className="todo">
      <br />
      <h3>Title : {title}</h3>
      <p>Description: {description}</p>
      <div>
        <input
          type="checkbox"
          onChange={() => updateHandler(id)}
          checked={isCompleted}
        />
      </div>
      <div>
        <button className="btn" onClick={() => deleteHandler(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
