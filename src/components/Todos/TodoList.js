import styles from "./TodoList.module.scss";
import Todo from "./Todo";

function TodoList({ additionalClasses, todos, completeTodo, removeTodo, editTodo, completeEditTodo, resetTodos }) {
  return (
    <div className={`${styles.todoListContainer} ${additionalClasses}`}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} editTodo={editTodo} completeEditTodo={completeEditTodo} />
      ))}
      {todos.length > 0 && (
        <button className={styles.todoListButton} onClick={() => (additionalClasses ? resetTodos(true) : resetTodos(false))}>
          {additionalClasses ? "Delete completed tasks" : "Delete all tasks"}
        </button>
      )}
    </div>
  );
}
export default TodoList;
