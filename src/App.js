import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {

const [todos,setTodos] = useState([]);
const [filteredTasks,setFilteredTasks]=useState(todos)
const [checked,setChecked]=useState()
console.log(checked);



const addPost = (todo) => {
  if (!todo.text || /^\s*$/.test(todo.text)) {
    return;
  }

  const newTodos = [todo, ...todos]
  setTodos(newTodos);
};

const deletePost = id => {
  setTodos([...todos].filter(todo=>todo.id!==id))
}

const taskFilter=()=>{
}

let doneCheck = () => {
  setChecked()
}

  return (
    <div className='body'>
      <Header/>
      <Main 
        addPost={addPost}
        deletePost={deletePost}
        todos={todos}
        taskFilter={taskFilter}
        doneCheck={doneCheck}/>
        
  </div>
  );
}

export default App;
