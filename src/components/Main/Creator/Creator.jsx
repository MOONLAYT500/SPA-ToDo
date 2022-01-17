import React, { useState, useEffect, useRef } from 'react';
import s from './Creator.module.css';

const Creator = ({createPost,addPost}) => {

  const [input, setInput] = useState('');

  const handlerChange = (e) => {
    setInput(e.target.value);
  }; 

  const handlerSubmit = (e) => {
    e.preventDefault();
    createPost(input)
    setInput('');
  };

  return (
    <form className={s.inputBlock} onSubmit={handlerSubmit}>
      <input
        className={s.inputBar}
        type="text"
        placeholder="I want to do..."
        value={input}
        name="text"
        onChange={handlerChange}
        autoFocus
      />
      <button className={s.addTask}>ADD</button>
    </form>
  );
};

export default Creator;


