import s from './PageButton.module.css'

const PageButton = ({number,handlerClick,activeBtn}) => {
  return (
    <button
    onClick={() => {
      handlerClick(number);
    }}
    className={activeBtn === number || s.pageButtonActive}
  >
    First
  </button>
  )
}

export default PageButton