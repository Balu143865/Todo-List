import React, { useState, useEffect, useRef } from 'react';
import './CSS/Todo.css';
import TodoItems from './TodoItems';  // Importing the TodoItems component

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  const countRef = useRef(0);

  const add = () => {
    setTodos([...todos, { no: countRef.current++, text: inputRef.current.value, display: "" }]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", countRef.current);
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
    countRef.current = parseInt(localStorage.getItem("todos_count"), 10) || 0;
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='todo'>
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input' />
        <div onClick={add} className="todo-add-btn">ADD</div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => (
          <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
