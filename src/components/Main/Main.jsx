import Creator from './Creator/Creator';
import s from './Main.module.css';
import Scroll from './Scroll/Scroll';
import Sorter from './Sorter/Sorter';
import Tasks from './Tasks/Tasks';

const Main = ({addPost, deletePost, todos,taskFilter,doneCheck}) => {
  return (
    <div className={s.container}>
      <Creator 
        addPost={addPost}/>
      <Sorter
        taskFilter={taskFilter}
        
      />
      <Tasks
        doneCheck={doneCheck}
        deletePost={deletePost}
        todos={todos}/>
      {/* <Scroll /> */}
    </div>
  );
};

export default Main;
