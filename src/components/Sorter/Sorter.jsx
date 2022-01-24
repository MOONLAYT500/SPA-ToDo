import { useEffect, useState } from 'react/cjs/react.development';
import s from './Sorter.module.css';

const Sorter = ({
  statusFilter,
  createdAtFilter,
  todosStatus,
  checkedTodos,
  unCheckedTodos,
}) => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeDate, setActiveDate] = useState('desc');
  useEffect(()=>{
    setActiveStatus(todosStatus)
  },[todosStatus])

  const timeFilter = (e) => {
    createdAtFilter(e.target.id);
    setActiveDate(e.target.id);
  };

  const chekedFilter = (e) => {
    statusFilter(e.target.id)
    setActiveStatus(e.target.id);
  };




  return (
    <div className={s.sort}>
      <div className={s.sortMenuButtons}>
        <button
          id='all'
          className={
            activeStatus === 'all'
              ? s.sortButtonActive
              : s.sortButton
          }
          onClick={chekedFilter}
          
        >
          All
        </button>
        <button
          id='done'
          disabled={checkedTodos.length === 0 ? 'disabled' : ''}
          className={
            activeStatus === 'done'
              ?s.sortButtonActive
              : s.sortButton
          }
          onClick={chekedFilter}
        >
          Done
        </button>
        <button
          id='undone'
          disabled={unCheckedTodos.length === 0 ? 'disabled' : ''}
          className={
            activeStatus === 'undone'
              ? s.sortButtonActive
              : s.sortButton
          }
          onClick={chekedFilter}
        >
          Undone
        </button>
      </div>
      <div className={s.sortByDate}>
        <div className={s.sortDataText}>Sort by Date</div>
        <div>
          <button
          id='asc'
            className={
              activeDate === 'asc'
                ? `${s.sortDateButton} ${s.sortDateButtonActive}`
                : s.sortDateButton
            }
            onClick={timeFilter}
          ></button>
          <button
          id='desc'
            className={
              activeDate === 'desc'
                ? `${s.sortDateButton} ${s.sortDateButtonActive}`
                : s.sortDateButton
            }
            onClick={timeFilter}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Sorter;
