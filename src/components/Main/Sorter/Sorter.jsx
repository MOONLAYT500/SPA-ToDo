import { useState } from 'react/cjs/react.development';
import s from './Sorter.module.css'

const Sorter = ({taskFilter}) => {
  
  return(
    <div className={s.sort}>
    <div className={s.sortMenuButtons}>
      <button 
        className={s.sortButton}
      >All</button>
      <button className={s.sortButton}>Done</button>
      <button className={s.sortButton}>Undone</button>
    </div>
    <div className={s.sortByDate}>
      <div className={s.sortDataText}>Sort by Date</div>
      <div>
        <button 
          className={s.sortDateButton}>
        </button>
        <button className={s.sortDateButton}>
        </button>
      </div>
    </div>
  </div>
  )
}

export default Sorter;