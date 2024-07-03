import { useState } from "react";

import styles from "./Todo.module.scss";
import TodoActions from "./TodoActions";

function Todo({ todo, completeTodo, removeTodo, editTodo, completeEditTodo }) {
  const [textTodo, setTextTodo] = useState(todo.text);

  function handleEditFormSubmit(event) {
    event.preventDefault();
    completeEditTodo(todo, textTodo);

    setTextTodo(todo.text);
  }

  return (
    <div className={`${styles.todo} ${todo.isCompleted ? styles.todoComplete : ""}`}>
      {todo.isEditing && !todo.isCompleted ? (
        <form className={styles.todoEditForm} onSubmit={handleEditFormSubmit}>
          <input type="text" value={textTodo} onChange={(e) => setTextTodo(e.target.value)} />
        </form>
      ) : (
        <div className={styles.todoText}>{todo.text}</div>
      )}
      <TodoActions removeTodo={removeTodo} todo={todo} editTodo={editTodo} completeTodo={completeTodo} />
    </div>
  );
}
export default Todo;
