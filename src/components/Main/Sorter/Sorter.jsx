import { useState } from 'react/cjs/react.development';
import s from './Sorter.module.css';

const Sorter = ({
  taskFilterDone,
  taskFilterUnDone,
  taskFilterAll,
  oldFilter,
  newFilter,
}) => {
  
  const old = () => {
    oldFilter();
  };

  const fresh = () => {
    newFilter();
    console.log('click');
  };

  const all = () => {
    taskFilterAll();
  };

  const done = () => {
    taskFilterDone();
  };

  const unDone = () => {
    taskFilterUnDone();
  };

  return (
    <div className={s.sort}>
      <div className={s.sortMenuButtons}>
        <button className={s.sortButton} onClick={all}>
          All
        </button>
        <button className={s.sortButton} onClick={done}>
          Done
        </button>
        <button className={s.sortButton} onClick={unDone}>
          Undone
        </button>
      </div>
      <div className={s.sortByDate}>
        <div className={s.sortDataText}>Sort by Date</div>
        <div>
          <button className={s.sortDateButton} onClick={old}></button>
          <button className={s.sortDateButton}
          onClick={fresh}></button>
        </div>
      </div>
    </div>
  );
};

export default Sorter;
