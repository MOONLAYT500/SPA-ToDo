import { useState } from 'react/cjs/react.development';
import Task from './Task/Task';
import s from './Tasks.module.css';

const Tasks = ({ todos, deletePost,doneCheck}) => {

  const dateToString = (date) => {
    return `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()},${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;
  };


  let changeState = () => {
    doneCheck()
  };

  return todos.map((todo) => (
    <div key={todo.id} className={s.task}>
      <input
        className={s.taskCheck}
        type="checkbox"
        name="task-check"
        id="taskCheck"
        onChange={changeState}
        checked={todo.checked}
      />
      <span className={s.taskText}>{todo.text}</span>
      <span className={s.taskDate}>{dateToString(todo.date)}</span>
      <button
        className={s.deleteTask}
        onClick={() => {
          deletePost(todo.id);
        }}
      ></button>
    </div>
  ));
};

export default Tasks;
