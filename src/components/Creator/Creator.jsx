import React, { useState } from 'react';
import s from './Creator.module.css';

const Creator = ({ createTodo }) => {
  const [input, setInput] = useState('');

  const handlerChange = (e) => {
    setInput(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    createTodo(input);
    setInput('');
  };

  return (
    <form className={s.inputBlock} onSubmit={handlerSubmit}>
      <input
        className={s.inputBar}
        type="text"
        placeholder="I want to do..."
        value={input}
        onChange={handlerChange}
        autoFocus
      />
      <button className={s.addTask}>ADD</button>
    </form>
  );
};

export default Creator;
