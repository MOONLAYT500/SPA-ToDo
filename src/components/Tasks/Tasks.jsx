import s from './Tasks.module.css'
import Task from './Task/Task';


const Tasks = ({
  currentTodos,
  chekTodo,
  editTodo,
  deleteTodo,
}) => {
  return (
    <div className={s.tasks}>
      {currentTodos.map((todo) => (
      <Task
        todo={todo}
        chekTodo={chekTodo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        key={todo.uuid}
      />
      ))}
    </div>
  );
};

export default Tasks;
