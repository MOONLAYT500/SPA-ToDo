import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import s from './Scroll.module.css';

const Scroll = ({ paginate, postsNumber, currentPage }) => {
  const [activeBtn, setActiveBtn] = useState(currentPage);
  useEffect(() => {
    setActiveBtn(currentPage);
  }, [currentPage]);

  const pageNumbers = [];
  //new Array(postsNumber / 5).fill([]);

  for (let i = 1; i <= Math.ceil(postsNumber / 5); i++) {
    //динамическое получение количесива страниц , зависит от общего количества элементов и элементов на одной странице
    pageNumbers.push(i); //пушим страницу в массив
  }

  const lastPageNumber = (pageNumber) => {
    if (pageNumber > 1) return pageNumber;
  };

  //const lastPageNumber = (pageNumber) => pageNumber > 1 && pageNumber;
  

  const handlerClick = (number) => {
    paginate(number);
    setActiveBtn(number);
  };


  return (
    <div className={s.pages}>
      <button
        onClick={() => {
          handlerClick(1);
        }}
        className={
          activeBtn === 1
            ? ` ${s.pageButton} ${s.pageButtonActive}`
            : s.pageButton
        }
      >
        First
      </button>
      {pageNumbers.map((number) => (
        <button
          className={
            activeBtn === number
              ? ` ${s.pageButton} ${s.pageButtonActive}`
              : s.pageButton
          }
          key={number}
          onClick={() => {
            handlerClick(number);
          }}
        >
          {number}
        </button>
      ))}
      <button
        className={
          lastPageNumber(pageNumbers.length) === activeBtn
            ? ` ${s.pageButton} ${s.pageButtonActive}`
            : s.pageButton
        }
        onClick={() => {
          handlerClick(pageNumbers.length);
        }}
      >
        Last
      </button>
    </div>
  );
};

export default Scroll;
