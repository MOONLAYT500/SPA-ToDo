import s from './Scroll.module.css';

const Scroll = () => {
  return (
    <div className={s.pages}>
      <button className={` ${s.pageButton} ${s.pageButtonActive}`}>&#171;</button>
      <button className={s.pageButton}>1</button>
      <button className={s.pageButton}>2</button>
      <button className={s.pageButton}>3</button>
      <button className={s.pageButton}>&#187;</button>
    </div>
  );
};

export default Scroll;