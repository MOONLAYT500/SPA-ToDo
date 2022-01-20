import { useState } from 'react/cjs/react.development';
import s from './Sorter.module.css';

const Sorter = ({
  statusFilter,
  dateFilter,
}) => {
  const [activeStatus, setActiveStatus] = useState('a');
  const [activeDate, setActiveDate] = useState('f');

  const timeFilter = (e) => {
    dateFilter(e.target.id);
    setActiveDate(e.target.id);
  };

  const chekedFilter = (e) => {
    setActiveStatus(e.target.id);
    statusFilter(e.target.id)
  };

  return (
    <div className={s.sort}>
      <div className={s.sortMenuButtons}>
        <button
          id='a'
          className={
            activeStatus === 'a'
              ? `${s.sortButton} ${s.sortButtonActive}`
              : s.sortButton
          }
          onClick={chekedFilter}
          
        >
          All
        </button>
        <button
          id='d'
          className={
            activeStatus === 'd'
              ? `${s.sortButton} ${s.sortButtonActive}`
              : s.sortButton
          }
          onClick={chekedFilter}
        >
          Done
        </button>
        <button
          id='u'
          className={
            activeStatus === 'u'
              ? `${s.sortButton} ${s.sortButtonActive}`
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
