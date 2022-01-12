import s from './Sorter.module.css'

const Sorter = () => {
  return(
    <div className={s.sort}>
    <div className={s.sortMenuButtons}>
      <button className={`${s.sortButton} ${s.sortButtonActive}`}>All</button>
      <button className={s.sortButton}>Done</button>
      <button className={s.sortButton}>Undone</button>
    </div>
    <div className={s.sortByDate}>
      <div className={s.sortDataText}>Sort by Date</div>
      <div>
        <button className={`${s.sortDateButton} ${s.sortDateButtonActive}`}>
          <img className={s.arrowUp} src="./img/arrowUp.svg" alt="OLD" />
        </button>
        <button className={s.sortDateButton}>
          <img className={s.arrowUp} src="./img/arrowUp.svg" alt="OLD" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Sorter;