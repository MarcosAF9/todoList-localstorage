import React, { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import styles from "./searchBar.module.css";

const Searchbar = () => {
  const { todoList, setTodoList } = useContext(TodoContext);
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);

    if (!value) {
      setTodoList(JSON.parse(localStorage.getItem("todo-list")));
    } else {
      const resultsArray = todoList.filter(
        (todo) =>
          todo.title.toLowerCase().includes(value) ||
          todo.description.toLowerCase().includes(value)
      );
      setTodoList(resultsArray);
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.formInput}
      />
      <button type="submit" className={styles.formBtn}>
        Pesquisar
      </button>
    </form>
  );
};

export default Searchbar;
