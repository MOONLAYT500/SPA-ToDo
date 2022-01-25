import React, { useState } from 'react';
import { Checkbox } from 'antd';
import s from './Task.module.css';

const Task = ({ todo, deleteTodo, chekTodo, editTodo }) => {
  const [input, setInput] = useState(todo.name);

  const dateToString = (createdAt) => {
    return `${createdAt.getHours()}:${createdAt.getMinutes() < 10 ? '0'+createdAt.getMinutes() : createdAt.getMinutes()}:${createdAt.getSeconds() < 10 ? '0'+createdAt.getSeconds() : createdAt.getSeconds()} ${createdAt.getDate()}/${createdAt.getMonth() < 9 ? '0'+(createdAt.getMonth() + 1) : createdAt.getMonth() + 1}/${createdAt.getFullYear()} `;
  };


  const handlerSubmit = (e) => {
    e.preventDefault();
    editTodo(input, todo.uuid);
    setInput(input);
    e.target.blur();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      handlerSubmit(e);
    } 
    if (e.keyCode == 27) {
      setInput(todo.name);
      e.target.blur();
    }
  };

  const editName = (e) => setInput(e.target.value);

  let doneCheck = () => {
    const status = !todo.done
    chekTodo(todo.uuid,status)
  }


  const todoDelete = () => deleteTodo(todo.uuid);

  return (
    <div className={s.task}>
      <div className={s.taskPart}>
        <Checkbox checked={todo.done}  onChange={doneCheck}/>
      {/* <input
        className={s.taskCheck}
        type="checkbox"
        name="task-check"
        id="taskCheck"
        checked={todo.done}
        onChange={doneCheck}
      /> */}
      <form className={s.taskName} onSubmit={handlerSubmit}>
        <input
          type="text"
          className={s.taskName}
          value={input}
          onChange={editName}
          onKeyDown={handleKeyDown}
        />
      </form>
      </div>
      <div className={s.taskPart}>
      <span className={s.taskDate}>{dateToString((new Date(todo.createdAt)))}</span>
      <button className={s.deleteTask} onClick={todoDelete}></button>
      </div>
    </div>
  );
};

export default Task;
