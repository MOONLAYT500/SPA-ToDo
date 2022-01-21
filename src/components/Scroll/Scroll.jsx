import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import s from './Scroll.module.css';

const Scroll = ({ paginate, postsNumber, currentPage }) => {
  const [activeBtn, setActiveBtn] = useState(currentPage);
  useEffect(() => {
    setActiveBtn(currentPage);
  }, [currentPage]);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(postsNumber / 5); i++) {
    pageNumbers.push(i);
  }

  const lastPageNumber = (pageNumber) => pageNumber > 1 && pageNumber;
  

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
              ? s.pageButtonActive
              : undefined
        }
      >
        First
      </button>
      {pageNumbers.map((number) => (
        <button
          className={activeBtn === number ? s.pageButtonActive: undefined}
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
            ?s.pageButtonActive
            : undefined
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
