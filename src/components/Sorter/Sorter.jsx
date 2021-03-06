import { useEffect, useState } from 'react/cjs/react.development';
import s from './Sorter.module.css';

const Sorter = ({
  statusFilter,
  dateFilter,
  todosStatus,
  checkedTodos,
  unCheckedTodos,
}) => {
  const [activeStatus, setActiveStatus] = useState(todosStatus);
  const [activeDate, setActiveDate] = useState('f');
  useEffect(()=>{
    setActiveStatus(todosStatus)
  },[todosStatus])

  const timeFilter = (e) => {
    dateFilter(e.target.id);
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
          id='a'
          className={
            activeStatus === 'a'
              ? s.sortButtonActive
              : s.sortButton
          }
          onClick={chekedFilter}
          
        >
          All
        </button>
        <button
          id='d'
          disabled={checkedTodos.length === 0 ? 'disabled' : ''}
          className={
            activeStatus === 'd'
              ?s.sortButtonActive
              : s.sortButton
          }
          onClick={chekedFilter}
        >
          Done
        </button>
        <button
          id='u'
          disabled={unCheckedTodos.length === 0 ? 'disabled' : ''}
          className={
            activeStatus === 'u'
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
          id='o'
            className={
              activeDate === 'o'
                ? `${s.sortDateButton} ${s.sortDateButtonActive}`
                : s.sortDateButton
            }
            onClick={timeFilter}
          ></button>
          <button
          id='f'
            className={
              activeDate === 'f'
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
