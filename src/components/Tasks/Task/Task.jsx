import React, { useState } from 'react';
import { Checkbox, Typography, Button, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons/lib/icons';
import s from './Task.module.css';
import Text from 'antd/lib/typography/Text';
const { Paragraph } = Typography;

const Task = ({ todo, deleteTodo, editTodo }) => {
  const [input, setInput] = useState(todo.name);

  const dateToString = (createdAt) => {
    return `${createdAt.getHours()}:${
      createdAt.getMinutes() < 10
        ? '0' + createdAt.getMinutes()
        : createdAt.getMinutes()
    }:${
      createdAt.getSeconds() < 10
        ? '0' + createdAt.getSeconds()
        : createdAt.getSeconds()
    }`;
  };

  const handlerSubmit = (input) => {
    if (!input || /^\s*$/.test(input)) {
      message.error('Empty string not allowed');
      return;
    }
    setInput(input);
    editTodo({name:input}, todo.uuid)
    .then(res=>{if(!res){
      setInput(todo.name)
    }})
    
  };

  let doneCheck = () => {
    todo.done = !todo.done;
    editTodo(todo, todo.uuid);
  };

  const todoDelete = (e) => {
    e.currentTarget.disabled = true;
    deleteTodo(todo.uuid);
  };

  return (
    <div className={s.task}>
      <div className={s.taskPart}>
        <Checkbox checked={todo.done} onChange={doneCheck} style={{}} />
        <Paragraph
          style={{ margin: 'auto', padding: '5px 15px ' }}
          editable={{
            enterIcon: null,
            onChange: handlerSubmit,
            triggerType: 'text',
          }}
        >
          {input}
        </Paragraph>
      </div>
      <div className={s.taskPart}>
        <Text>{dateToString(new Date(todo.createdAt))}</Text>
        <Button
          icon={<DeleteTwoTone twoToneColor="red" />}
          shape="circle"
          onClick={todoDelete}
          className={s.deleteTask}
          type="ghost"
        />
      </div>
    </div>
  );
};

export default Task;
