"use client";
import React, { useEffect, useState } from "react";
import TodoContext from "./TodoContext";

const Provider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todo-list")));
  }, []);

  return (
    <TodoContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};

export default Provider;
