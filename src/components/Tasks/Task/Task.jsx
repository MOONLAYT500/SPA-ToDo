import React, { useState} from 'react';
import { Checkbox, Typography,Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons/lib/icons';
import s from './Task.module.css';
import Text from 'antd/lib/typography/Text';
const { Paragraph } = Typography;

const Task = ({ todo, deleteTodo, chekTodo, editTodo }) => {
  const [input, setInput] = useState(todo.name);

  const dateToString = (createdAt) => {
    return `${createdAt.getHours()}:${
              createdAt.getMinutes() < 10
              ? '0' + createdAt.getMinutes()
              : createdAt.getMinutes()
          }:${
              createdAt.getSeconds() < 10
              ? '0' + createdAt.getSeconds()
              : createdAt.getSeconds()}` 
              // ${createdAt.getDate()}/${
              //   createdAt.getMonth() < 9
              //     ? '0' + (createdAt.getMonth() + 1)
              //     : createdAt.getMonth() + 1
              // }/${createdAt.getFullYear()} `;
  };

  const handlerSubmit = (input) => {
    setInput(input)
    editTodo(input, todo.uuid);
  };

  let doneCheck = () => {
    const status = !todo.done;
    chekTodo(todo.uuid, status);
  };

  const todoDelete = () => deleteTodo(todo.uuid);

  return (
    <div className={s.task}>
      <div className={s.taskPart}>
        <Checkbox checked={todo.done} onChange={doneCheck} />
        <Paragraph
          editable={{
            onChange: handlerSubmit,
            triggerType: 'text',
          }}
        >
          {input}
        </Paragraph>
      </div>
      <div className={s.taskPart}>
        <Text >
          {dateToString(new Date(todo.createdAt))}
        </Text>
        <Button icon={<DeleteTwoTone twoToneColor="red"/>} shape="circle" onClick={todoDelete} className={s.deleteTask} type='ghost'/>
      </div>
    </div>
  );
};

export default Task;

