import React from "react";
import { db } from "./firebase-config";

export default function TodoListItem({ todo, inprogress, id }) {
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="todo" key={id}>
        <h3>{todo}</h3>
        <p>{inprogress ? "In Progress" : "Completed"}</p>
      </div>

      <div className="btnCrud">
        <button className="btnDown" onClick={toggleInProgress}>
          {inprogress ? "Done" : "Undone"}
        </button>
        <button className="btnClose" onClick={deleteTodo}>
          x
        </button>
      </div>
    </div>
  );
}
