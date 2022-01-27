import s from './Tasks.module.css'
import Task from './Task/Task';


const Tasks = ({
  filteredTodos,
  chekTodo,
  editTodo,
  deleteTodo,
}) => {
  return (
    <div className={s.tasks}>
      {filteredTodos.map((todo) => ( // mapping filteredTasks to component with recieved data
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
