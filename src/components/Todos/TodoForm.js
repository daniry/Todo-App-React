import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import Button from "../UI/Button";
import styles from "./TodoForm.module.scss";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!text) {
      setError("Please enter a task");
    } else {
      addTodo(text);
      setText("");
      setError("");
    }
  }

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Enter a task" value={text} onChange={(e) => setText(e.target.value)} />
        <Button type="submit" title="Submit">
          <FiArrowUpRight />
        </Button>
      </form>
      {!!error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}

export default TodoForm;
