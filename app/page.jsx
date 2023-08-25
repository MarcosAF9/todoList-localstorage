"use client";
import React, { useContext } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Link from "next/link";
import TodoCard from "./components/TodoCard";
import Searchbar from "./components/Searchbar";
import TodoContext from "./context/TodoContext";
import styles from "./page.module.css";

const TodoList = () => {
  const { todoList } = useContext(TodoContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lista de Tarefas</h1>
        <Searchbar />
      </div>

      <div className={styles.todoList}>
        {todoList.length > 0 ? (
          todoList.map((todo, index) => <TodoCard key={index} todo={todo} />)
        ) : (
          <div className={styles.todo}>
            <p>Nenhuma tarefa encontrada!</p>
          </div>
        )}
      </div>
      <Link href={"/newtodo"}>
        <BsFillPlusCircleFill className={styles.addIcon} />
      </Link>
    </div>
  );
};

export default TodoList;
