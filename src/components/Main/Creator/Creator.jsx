import s from './Creator.module.css';

const Creator = () => {
  return (
    <div className={s.inputBlock}>
      <input className={s.inputBar} type="text" placeholder="I want to do..." />
      <button className={s.addTask}>ADD</button>
    </div>
  );
};

export default Creator;