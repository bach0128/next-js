import React, { useEffect, useState } from "react";
import { client } from "../../utils/clientUtils";
import { useSelector, useDispatch } from "react-redux";
import { columnSlice } from "../../redux/slice/columnSlice";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../Home/Home.scss";
import Tasks from "./Task/Tasks";

const { add, pull, del } = columnSlice.actions;

export default function Home() {
  const dispatch = useDispatch();
  const columnStore = useSelector((state) => state.columns.columns);
  const [columns, setColumns] = useState([]);

  const handleGetAll = async () => {
    const { data, response } = await client.get("/tasks");
    if (response.ok) {
      console.log(data.data.tasks);
      localStorage.setItem("columns", JSON.stringify(data.data.columns));
      localStorage.setItem("tasks", JSON.stringify(data.data.tasks));
      dispatch(pull(data.data.columns));
      setColumns(data.data.columns);
    }
  };

  let number = columnStore + 1;

  const handleDelCol = ({ _id }) => {
    const newList = columns.filter((col) => col._id !== _id);
    dispatch(del(newList));
    setColumns(newList);
    localStorage.setItem("columns", JSON.stringify(newList));
  };

  const handleAddCol = () => {
    dispatch(
      add({
        column: "New Col",
        columnName: "New Col",
        _id: number,
      })
    );
  };
  useEffect(() => {
    setColumns(columnStore);
  }, [columnStore]);

  useEffect(() => {
    handleGetAll();
  }, []);

  // split component
  const Column = ({ columnName, column, _id }) => {
    // const { attributes, listeners, setNodeRef, transform, transition } =
    //   useSortable({
    //     id: _id,
    //     data: { ...columns },
    //   });

    // const styleDnd = {
    //   transform: CSS.Translate.toString(transform),
    //   transition,
    // };

    return (
      <div
        // ref={setNodeRef}
        // style={styleDnd}
        // {...attributes}
        // {...listeners}
        className="task-col"
        key={column}
      >
        <div className="col-name">
          <span>{columnName ? columnName : "Col" + number}</span>
          <button className="btn-del-col" onClick={() => handleDelCol({ _id })}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
        <Tasks columnStatus={column} columnName={columnName} />
      </div>
    );
  };

  const handleDragEnd = (e) => {
    console.log(e);
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        <div className="container task-list w-full">
          <div className="task-row rounded-md">
            {columns?.map(({ columnName, column, _id }) =>
              Column({ columnName, column, _id })
            )}
            <div className="add-col">
              <button className="btn-add-col" onClick={handleAddCol}>
                <i className="fa-solid fa-circle-plus"></i>
                Add Column
              </button>
            </div>
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
