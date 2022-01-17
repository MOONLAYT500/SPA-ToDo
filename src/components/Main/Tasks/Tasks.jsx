import Task from './Task/Task';

const Tasks = ({ filteredTodos, deletePost,chekTask}) => {
  return filteredTodos.map((todo) => (
      <Task 
        todo={todo}
        key={todo.id} 
        deletePost={deletePost}
        chekTask={chekTask}
      />
  ));
};

export default Tasks;

