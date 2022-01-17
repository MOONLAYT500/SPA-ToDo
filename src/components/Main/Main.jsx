import Creator from './Creator/Creator';
import s from './Main.module.css';
import Scroll from './Scroll/Scroll';
import Sorter from './Sorter/Sorter';
import Tasks from './Tasks/Tasks';

const Main = ({
  createPost,
  addPost,
  deletePost,
  filteredTodos,
  taskFilterAll,
  taskFilterDone,
  taskFilterUnDone,
  oldFilter,
  newFilter,
  checked,
  chekTask,
}) => {
  return (
    <div className={s.container}>
      <Creator createPost={createPost} addPost={addPost} />
      <Sorter 
        taskFilterAll={taskFilterAll}
        taskFilterDone={taskFilterDone}
        taskFilterUnDone={taskFilterUnDone}
        newFilter={newFilter}
        oldFilter={oldFilter}
      />
      <Tasks
        deletePost={deletePost}
        filteredTodos={filteredTodos}
        checked={checked}
        chekTask={chekTask}
      />

      {/* <Scroll /> */}
    </div>
  );
};

export default Main;
