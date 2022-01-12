import Creator from './Creator/Creator';
import s from './Main.module.css'
import Scroll from './Scroll/Scroll';
import Sorter from './Sorter/Sorter';
import Tasks from './Tasks/Tasks';

const Main = () => {
  return (
    <div className={s.container}>
      <Creator/>
      <Sorter/>
      <Tasks/>
      <Scroll/>
    </div>
  )
}

export default Main;