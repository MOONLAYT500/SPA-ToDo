import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Creator from './components/Creator/Creator';
import Scroll from './components/Scroll/Scroll';
import Sorter from './components/Sorter/Sorter';
import Tasks from './components/Tasks/Tasks';

function App() {
  // const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosStatus, setTodosStatus] = useState('all');
  const [createdAt,setCreatedAt] = useState('desc')
  const [todosCount,setTodosCount] =useState()
  const [postsPerPage,setPostsPerPage] = useState(5);
  const lastTodoIndex = currentPage * postsPerPage;
  const firstTodoIndex = lastTodoIndex - postsPerPage;
  const currentTodos = filteredTodos.slice(firstTodoIndex, lastTodoIndex);
  const api = axios.create({
    baseURL: 'https://todo-api-learning.herokuapp.com/v1/',
  });

  useEffect(() => {
    getTodos(todosStatus,createdAt,postsPerPage,currentPage);

    setFilteredTodos(filteredTodos)
    setCurrentPage(currentPage)
  }, [currentPage,todosStatus,createdAt]);

    console.log(currentPage);
  // useEffect(() => {
  //   let renderedTodos = todos;
  //   getTodos(todosStatus,createdAt,postsPerPage,currentPage)
  //   // if (renderedTodos.length === 0) setTodosStatus('a'); не забыыыть

  //   setFilteredTodos(renderedTodos);
  // }, [currentPage,todosStatus,createdAt]);

  // useEffect(() => {
  //   setCurrentPage(currentPage);
  // }, [filteredTodos]);

  const getTodos = async (filterBy,order,pp,page) => {
    try {
      const res = await api.get(`tasks/3`,{params:{
        filterBy: filterBy === 'all' ? '' : filterBy,
        order: order,
        pp:pp,
        page:page
      }})
      console.log(res);
      setFilteredTodos(res.data.tasks);
      setTodosCount(res.data.count);
    } catch (e) {
      if (e.res) {
        alert(e.res.data);
        alert(e.res.status);
        alert(e.res.headers);
      } else alert(`Error: ${e.message}`);
    }
  };



  const createTodo = async (input) => {
    try {
      const todo = {
        name: input,
        done: false,
      };
      if (!todo.name || /^\s*$/.test(todo.name)) {
        return;
      }
      await api.post(`task/3`, todo);
      getTodos();
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  const chekTodo = async (id, status) => {
    await api.patch(`task/3/${id}`, { done: status });
    getTodos();
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`task/3/${id}`);
      getTodos();
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  const editTodo = async(input, id) => {
    try {
      await api.patch(`task/3/${id}`, { name: input });
      getTodos();
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  const createdAtFilter = async(key) => setCreatedAt(key)

  const statusFilter = (key) => setTodosStatus(key);

  const checkedTodos = filteredTodos.filter((todo) => todo.done === true);
  const unCheckedTodos = filteredTodos.filter((todo) => todo.done === false);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // if (filteredTodos.length !== 0 && currentTodos.length === 0) {
  //   paginate(currentPage - 1);
  // }
  return (
    <div className="body">
      <h1 className="header">To-Do List</h1>
      <div className="container">
        <Creator createTodo={createTodo} />
        <Sorter
          todosStatus={todosStatus}
          statusFilter={statusFilter}
          createdAtFilter={createdAtFilter}
          checkedTodos={checkedTodos}
          unCheckedTodos={unCheckedTodos}
        />
        {todosCount === 0 ? (
          <div>No Tasks</div>
        ) : (
          <Tasks
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            filteredTodos={filteredTodos}
            chekTodo={chekTodo}
            currentTodos={currentTodos}
          />
        )}
        {todosCount > 5 && (
          <Scroll
            paginate={paginate}
            postsNumber={todosCount}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;