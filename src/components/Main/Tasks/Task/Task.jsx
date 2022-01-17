import React, { useState } from 'react';
import s from './Task.module.css';

const Task = ({ todo, deletePost, chekTask, editPost }) => {
  const [input, setInput] = useState(todo.text);

  const dateToString = (date) => {
    return `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()},${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;
  };



  let doneCheck = () => {
    chekTask(todo.id);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    editPost(input, todo.id);
    setInput(input);
  };

  const changeText = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }

  return (
    <div className={s.task}>
      <input
        className={s.taskCheck}
        type="checkbox"
        name="task-check"
        id="taskCheck"
        checked={todo.checked}
        onChange={doneCheck}
        
      />
      <form
        className={s.taskText}
        onKeyDown={handleKeyDown}
        onSubmit={handlerSubmit}

      >
        <input
          type="text"
          className={s.taskText}
          value={input}
          onChange={changeText}
        />
      </form>
      {/* <span type="text" className={s.taskText}>
        {todo.text}
      </span> */}
      <span className={s.taskDate}>{dateToString(todo.date)}</span>
      <button
        className={s.deleteTask}
        onClick={() => {
          deletePost(todo.id);
        }}
      ></button>
    </div>
  );
};

export default Task;
