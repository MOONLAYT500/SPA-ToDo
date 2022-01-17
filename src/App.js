import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  const [todos, setTodos] = useState([]);
  const [timeTodos, setTimeTodos] = useState(todos)
  const [filteredTodos,setFilteredTodos] = useState(timeTodos)

  useEffect(()=>
  { setTimeTodos(todos)
  }, [todos]
)

  useEffect(()=>
    { setFilteredTodos(timeTodos)
    }, [timeTodos]
  )



  const createPost = (input) => {
    addPost({
      id: Math.trunc(Math.random() * 10000),
      text: input,
      date: new Date(),
      checked: false,
    });
  };

  const addPost = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const deletePost = (id) => {
    setTodos([...todos].filter((todo) => todo.id !== id));
  };

  const chekTask = (id) => {
    let checkedTodos = todos.map(
      todo=>{
        if(todo.id === id) {
          todo.checked = !todo.checked
        }
        return todo
      })
      setTodos(checkedTodos)
  }

  const oldFilter = () => {
    const oldTasks = todos.sort(
      (a,b)=>a.date-b.date
    ).map(item=>item)
    setFilteredTodos(oldTasks)
  }

  const newFilter = () => {
    const newTasks = todos.sort(
      (a,b)=>b.date-a.date
    ).map(item=>item)
    setFilteredTodos(newTasks)
  }

  const taskFilterAll = () => {
    setFilteredTodos(timeTodos)
  };  

  const taskFilterDone = () => {
    const doneTasks = timeTodos.filter(
      (timeTodo) => timeTodo.checked === true
    );
    setFilteredTodos(doneTasks)
  };

  const taskFilterUnDone = () => {
    const unDoneTasks = timeTodos.filter(
      (timeTodo) => timeTodo.checked === false
    );
    setFilteredTodos(unDoneTasks)
  };





  return (
    <div className="body">
      <Header />
      <Main
        taskFilterAll={taskFilterAll}
        filteredTodos={filteredTodos}
        createPost={createPost}
        taskFilterDone={taskFilterDone}
        taskFilterUnDone={taskFilterUnDone}
        newFilter={newFilter}
        oldFilter={oldFilter}
        addPost={addPost}
        chekTask={chekTask}
        deletePost={deletePost}
      />
    </div>
  );
}

export default App;
