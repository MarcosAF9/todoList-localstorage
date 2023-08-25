"use client";
import React, { useContext, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import TodoContext from "../context/TodoContext";
import { useRouter } from "next/navigation";
import styles from "./newTodo.module.css";

const NewTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setTodoList } = useContext(TodoContext);
  const router = useRouter();

  const getNextAvailableId = () => {
    const todoDB = JSON.parse(localStorage.getItem("todo-list")) ?? [];
    const ids = todoDB.map((todo) => todo.id);
    const maxId = Math.max(...ids, 0);
    return maxId + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = getNextAvailableId();
    const newTodo = {
      id,
      title,
      description,
      isChecked: false,
    };
    let todoDB = JSON.parse(localStorage.getItem("todo-list")) ?? [];
    todoDB.push(newTodo);
    alert("Nova tarefa adicionada!");
    localStorage.setItem("todo-list", JSON.stringify(todoDB));
    setTodoList(todoDB);
    setTitle("");
    setDescription("");
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={"/"}>
          <AiOutlineLeft className={styles.backIcon} />
        </Link>
        <h1>Lista de Tarefas</h1>
      </div>

      <form className={styles.createTodo} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <label htmlFor="title">Nome</label>
          <input
            type="text"
            placeholder="Adicione o nome da tarefa"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
          />
        </div>
        <div className={styles.description}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            cols="30"
            rows="10"
            placeholder="Digite a descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.descriptionInput}
          />
        </div>
        <button className={styles.saveBtn}>Salvar</button>
      </form>
    </div>
  );
};

export default NewTodo;
