import React, { useState, useEffect, useRef } from 'react';
import s from './Creator.module.css';

const Creator = ({addPost}) => {

  const [input, setInput] = useState('');
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const handlerChange = (e) => {
    setInput(e.target.value);
  };

  const createPost = (e) => {
    e.preventDefault();
    addPost({
      id: Math.trunc(Math.random() * 10000),
      text: input,
      date: new Date(),
      checked: false,
    });
    setInput('');
  };

  return (
    <form className={s.inputBlock} onSubmit={createPost}>
      <input
        className={s.inputBar}
        type="text"
        placeholder="I want to do..."
        value={input}
        name="text"
        onChange={handlerChange}
        ref={inputRef}
      />
      <button className={s.addTask}>ADD</button>
    </form>
  );
};

export default Creator;


