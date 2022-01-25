import { Input } from 'antd';
import React, { useState } from 'react';
import { SaveTwoTone } from '@ant-design/icons/lib/icons';

const Creator = ({ createTodo }) => {
  const [input, setInput] = useState('');

  const handlerChange = (e) => setInput(e.target.value);


  const handlerSubmit = (e) => {
    createTodo(input);
    setInput('');
  };

  return (
    <Input  
        style={{marginBottom: 20, borderRadius: 10,'border': 'none'}}
        suffix={<SaveTwoTone twoToneColor='red'/>}
        placeholder="I want to do..."
        value={input}
        onChange={handlerChange}
        onPressEnter={handlerSubmit}
        />
  );
};

export default Creator;
