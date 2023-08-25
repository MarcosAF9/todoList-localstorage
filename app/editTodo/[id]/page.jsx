"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TodoContext from "/app/context/TodoContext";
import styles from "./editTodo.module.css";

const EditTodo = ({ params }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { todoList, setTodoList } = useContext(TodoContext);

  const todo = todoList.find((item) => item.id == params.id);

  useEffect(() => {
    let todoTitle = todo.title;
    let todoDescription = todo.description;
    setTitle(todoTitle);
    setDescription(todoDescription);
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedTodoList = todoList.map((item) =>
      item.id == todo.id
        ? { ...item, title: title, description: description }
        : item
    );
    setTodoList(updatedTodoList);
    localStorage.setItem("todo-list", JSON.stringify(updatedTodoList));
    alert("Tarefa editada com sucesso!");
    router.push("/");
  };

  const deletedTodo = (id) => {
    const shouldDelete = window.confirm(
      "Tem certeza que quer excluir essa tarefa?"
    );

    if (shouldDelete) {
      let todoDB = JSON.parse(localStorage.getItem("todo-list"));
      let updatedDB = todoDB.filter((todo) => todo.id !== Number(id));
      localStorage.setItem("todo-list", JSON.stringify(updatedDB));
      setTodoList(updatedDB);
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={"/"}>
          <AiOutlineLeft className={styles.backIcon} />
        </Link>
        <h1>Lista de Tarefas</h1>
      </div>

      <form className={styles.createTodo} onSubmit={handleEdit}>
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
            className={styles.descriptionInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "22px" }}>
          <button className={styles.saveBtn} type="submit">
            Salvar
          </button>
          <button
            type="button"
            className={styles.saveBtn}
            style={{ backgroundColor: "#EF4565" }}
            onClick={() => deletedTodo(params.id)}
          >
            Deletar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
