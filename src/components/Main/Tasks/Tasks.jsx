import Task from './Task/Task';

const Tasks = ({ filteredTodos, deletePost,chekTask,createPost,editPost}) => {
  return filteredTodos.map((todo) => (
      <Task
        editPost={editPost} 
        createPost={createPost}
        todo={todo}
        key={todo.id} 
        deletePost={deletePost}
        chekTask={chekTask}
      />
  ));
};

export default Tasks;

