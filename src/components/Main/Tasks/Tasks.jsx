import Task from './Task/Task';
import s from './Tasks.module.css';

const Tasks = () => {
  return (
    <div className={s.tasks}>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
    </div>
  );
};

export default Tasks;
