import React, { useState } from 'react';
import s from './Task.module.css';

const Task = ({ todo, deleteTodo, chekTodo, editTodo }) => {
  const [input, setInput] = useState(todo.text);

  const dateToString = (date) => {
    return `${date.getHours()}.${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth() < 9 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()} `;
  };



  const handlerSubmit = (e) => {
    e.preventDefault();
    editTodo(input, todo.id);
    setInput(input);
    e.target.blur();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      handlerSubmit(e);
    } 
    if (e.keyCode == 27) {
      setInput(todo.text);
      e.target.blur();
    }
  };

  const editText = (e) => setInput(e.target.value);

  let doneCheck = () => chekTodo(todo.id);

  const todoDelete = () => deleteTodo(todo.id);

  return (
    <div className={s.task}>
      <div className={s.taskPart}>
      <input
        className={s.taskCheck}
        type="checkbox"
        name="task-check"
        id="taskCheck"
        checked={todo.checked}
        onChange={doneCheck}
      />
      <form className={s.taskText} onSubmit={handlerSubmit}>
        <input
          type="text"
          className={s.taskText}
          value={input}
          onChange={editText}
          onKeyDown={handleKeyDown}
        />
      </form>
      </div>
      <div className={s.taskPart}>
      <span className={s.taskDate}>{dateToString(todo.date)}</span>
      <button className={s.deleteTask} onClick={todoDelete}></button>
      </div>
    </div>
  );
};

export default Task;
