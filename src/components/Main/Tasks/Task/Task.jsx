import React, {useState} from 'react';
import s from './Task.module.css';

const Task = ({ todo, deletePost,chekTask}) => {
  const dateToString = (date) => {
    return `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()},${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;
  };

  let doneCheck = () => {
    chekTask(todo.id)
  };

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
      {/* <span 
        type="text" 
        className={s.taskText} 
        value={todo.text}/> */}
        <span
          type="text" 
          className={s.taskText}
        >{todo.text}</span>
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
