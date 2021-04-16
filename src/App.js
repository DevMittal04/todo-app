import "./styles.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import firebase from "firebase";
import TodoListItem from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // blank to run this function only on startup

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      // querySnapshot value is received by the onSnapshot query
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress
        }))
      );
    });
  }

  function validText(input) {
    if (!input.replace(/\s/g, "").length) {
      setTodoInput("");
      return false;
    } else {
      return true;
    }
  }

  function addTodo(e) {
    e.preventDefault();
    if (todoInput !== "" && validText(todoInput)) {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput
      });
      setTodoInput("");
    }
  }

  return (
    <div className="App">
      <h1>📖 To Do App</h1>
      <form>
        <input
          type="text"
          placeholder="Add the items here"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button id="btnSubmit" type="submit" onClick={addTodo}>
          Add item
        </button>
      </form>
      <div className="items">
        {todos.map((todo) => (
          <TodoListItem
            todo={todo.todo}
            inprogress={todo.inprogress}
            id={todo.id}
          />
        ))}
      </div>
    </div>
  );
}
