import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.scss";
import TodoForm from "./components/Todos/TodoForm";
import TodoList from "./components/Todos/TodoList";

import { dataStorage } from "./components/Services/dataStorage";

function App() {
  const [todos, setTodos] = useState(dataStorage.getItem("todosList") ? dataStorage.getItem("todosList") : []);
  const [todosComplete, setTodosComplete] = useState(dataStorage.getItem("todosCompleteList") ? dataStorage.getItem("todosCompleteList") : []);

  const addTodoHandler = (text) => {
    const newTodo = {
      text,
      isCompleted: false,
      isEditing: false,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodoHandler = (todo) => {
    if (!todo.isCompleted) setTodos(todos.filter((item) => item.id !== todo.id));
    else setTodosComplete(todosComplete.filter((item) => item.id !== todo.id));
  };

  const editTodoHandler = (todo) => {
    if (!todo.isCompleted) {
      setTodos(todos.map((item) => (item.id === todo.id ? { ...item, isEditing: !item.isEditing } : { ...item })));
    }
  };

  const completeEditTodoHandler = (todo, text) => {
    if (!todo.isCompleted && todo.isEditing) {
      todo.text = text;
      editTodoHandler(todo);
    }
  };

  const completeTodoHandler = (todo) => {
    removeTodoHandler(todo);
    if (!todo.isCompleted) {
      setTodosComplete([...todosComplete, todo]);
      todo.isEditing = false;
    } else setTodos([...todos, todo]);

    todo.isCompleted = !todo.isCompleted;
  };

  const resetTodosHandler = (completed) => {
    if (!completed) {
      setTodos([]);
    } else {
      setTodosComplete([]);
    }
  };

  dataStorage.setItem("todosList", todos);
  dataStorage.setItem("todosCompleteList", todosComplete);

  return (
    <div className="container">
      <div className="main">
        <div className="main-left">
          <img className="main-left__logo" src="images/logo.svg" width="197" height="60" alt="Logo" />
          <p className="main-left__text">
            Hi, friend
            <br />
            Check your ToDo list
          </p>
          <TodoForm addTodo={addTodoHandler} />
          <TodoList
            todos={todos}
            completeTodo={completeTodoHandler}
            removeTodo={removeTodoHandler}
            editTodo={editTodoHandler}
            completeEditTodo={completeEditTodoHandler}
            resetTodos={resetTodosHandler}
          />
        </div>
        <div className="main-right">
          <h2>Completed tasks</h2>
          {!todosComplete.length ? (
            <div className="no-completed-text">You don't have completed tasks</div>
          ) : (
            <TodoList todos={todosComplete} completeTodo={completeTodoHandler} removeTodo={removeTodoHandler} resetTodos={resetTodosHandler} additionalClasses="todos-complete" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
