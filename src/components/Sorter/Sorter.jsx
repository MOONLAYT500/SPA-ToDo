import { Typography } from 'antd';
import {Radio,Button } from 'antd';
import s from './Sorter.module.css';
import { UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons/lib/icons';
const { Text } = Typography;

const Sorter = ({
  statusFilter,
  createdAtFilter,
}) => {
  const chekedFilter = (e) => statusFilter(e.target.value)
  return (
    <div className={s.sort}>
        <Radio.Group
          onChange={chekedFilter}     
          buttonStyle="solid"
          defaultValue={'all'}
        >
          <Radio.Button  value={'all'}>All</Radio.Button>
          <Radio.Button value={'done'}>Done</Radio.Button>
          <Radio.Button value={'undone'}>Undone</Radio.Button>
        </Radio.Group>
      <div className={s.sortByDate}>
        <Text style={{'paddingRight': '10px'}}>Sort by Date</Text>
          <Button 
            
            onClick={()=>{createdAtFilter('asc')}}
            icon={<UpCircleTwoTone/>}
            type='ghost'
          ></Button>
          <Button 
            autoFocus
            onClick={()=>{createdAtFilter('desc')}}
            icon={<DownCircleTwoTone/>}
            type='ghost'
          ></Button>
      </div>
    </div>
  );
};

export default Sorter;
