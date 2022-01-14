import s from './Task.module.css';

const Task = () => {
  return (
    <div className={s.task}>
      <input
        className={s.taskCheck}
        type="checkbox"
        name="task-check"
        id="taskCheck"
      />
      <input type="text" name="" id="" className={s.taskText}/>
      <span className={s.taskDate}>11.01.2022</span>
      <button className={s.deleteTask}>
      </button>
    </div>
  );
};

export default Task;