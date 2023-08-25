import Link from "next/link";
import React, { useContext } from "react";
import styles from "./todoCard.module.css";
import TodoContext from "../context/TodoContext";

const TodoCard = ({ todo }) => {
  const { todoList, setTodoList } = useContext(TodoContext);

  const handleCheck = (id) => {
    console.log(id);
    const listItems = todoList.map((item) =>
      item.id == id ? { ...item, isChecked: !item.isChecked } : item
    );
    setTodoList(listItems);
    localStorage.setItem("todo-list", JSON.stringify(listItems));
  };

  return (
    <div className={styles.todo}>
      <input
        type="checkbox"
        className={styles.todoCheck}
        checked={todo.isChecked}
        onChange={() => handleCheck(todo.id)}
      />
      <Link href={`/editTodo/${todo.id}`} className={styles.todoLink}>
        <p>
          <strong>{todo.title}</strong>
        </p>
        <p>{todo.description}</p>
      </Link>
    </div>
  );
};

export default TodoCard;
