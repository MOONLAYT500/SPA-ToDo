import s from './Task.module.css';

const Task = () => {
  return (
    <div className={s.task}>
      <input
        className={s.taskCheck}
        type="checkbox"
        name="task-check"
        id="task-check1"
      />
      <label htmlFor={s.taskCheck1}></label>
      <span className={s.taskText}>do smth</span>
      <span className={s.taskDate}>11.01.2022</span>
      <button className={s.deleteTask}>
        <img className={s.deleteIcon} src="./img/delete.png" alt="Delete" />
      </button>
    </div>
  );
};

export default Task;