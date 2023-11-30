import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Tasks.scss";
import { tasksSlice } from "../../../redux/slice/tasksSlice";
import { useSelector, useDispatch } from "react-redux";

import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../../utils/clientUtils";

const { add, del } = tasksSlice.actions;

export default function Tasks({ columnStatus, columnName }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [allTask, setAllTask] = useState(tasks);
  const [openNewTaskForm, setOpenNewTaskForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const toggleOpenNewTaskForm = () => setOpenNewTaskForm(!openNewTaskForm);

  const handleDelTask = ({ _id }) => {
    const newList = allTask.filter((task) => task._id !== _id);
    dispatch(del(newList));
    setAllTask(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskName) {
      toast.error("Vui lòng nhập tên task");
    } else {
      const newTask = {
        content: newTaskName,
        column: columnStatus,
        columnName: columnName,
      };
      dispatch(add(newTask));
      setAllTask([...allTask, newTask]);
      client.post("/tasks", newTask);
      toast.success("Thêm task mới thành công");
    }
    toggleOpenNewTaskForm();
    setNewTaskName("");
  };

  useEffect(() => {
    setAllTask(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <div className="list">
      {allTask.map(({ column, content, _id }) => {
        if (column == columnStatus)
          return (
            <div key={_id} className="task">
              <div className="">{content}</div>
              <button
                className="btn-del-task"
                onClick={() => handleDelTask({ _id })}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          );
      })}
      {!openNewTaskForm ? (
        <button className="btn-add-task" onClick={toggleOpenNewTaskForm}>
          <i className="fa-solid fa-circle-plus"></i>
          Add Task
        </button>
      ) : (
        <form className="new-task" onSubmit={handleAddTask}>
          <input
            type="text"
            autoFocus
            placeholder="Enter new task"
            className="input-new-task form-input"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

Tasks.propTypes = {
  columnStatus: PropTypes.string.isRequired,
  columnName: PropTypes.string.isRequired,
};
