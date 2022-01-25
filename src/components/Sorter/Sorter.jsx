import { Button } from 'antd';
import { useEffect, useState } from 'react/cjs/react.development';
import s from './Sorter.module.css';

const Sorter = ({
  statusFilter,
  createdAtFilter,
  todosStatus,
}) => {
  const [activeDate, setActiveDate] = useState('desc');


  const timeFilter = (e) => {
    createdAtFilter(e.target.id);
    setActiveDate(e.target.id);
  };

  const chekedFilter = (id) => statusFilter(id)
  return (
    <div className={s.sort}>
      <div className={s.sortMenuButtons}>
        <Button
          onClick={()=>{chekedFilter('all')}}
          style={{ 'background': 'transparent','border':'none'}}
        >All</Button>
        <Button
          id='done'
          onClick={()=>{chekedFilter('done')}}
          style={{ 'background': 'transparent','border':'none'}}
        >Done</Button>
        <Button
          id='done'
          onClick={()=>{chekedFilter('undone')}}
          style={{ 'background': 'transparent','border':'none'}}
        >Undone</Button>
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
