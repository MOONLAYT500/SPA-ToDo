import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Creator from './components/Creator/Creator';
import Scroll from './components/Scroll/Scroll';
import Sorter from './components/Sorter/Sorter';
import Tasks from './components/Tasks/Tasks';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

function App() {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosStatus, setTodosStatus] = useState('all');
  const [createdAt, setCreatedAt] = useState('desc');
  const [todosCount, setTodosCount] = useState(0);
  const [change, setChange] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const api = axios.create({
    baseURL: 'https://todo-api-learning.herokuapp.com/v1/',
  });

  useEffect(async () => {
    const res = await getTodos(
      todosStatus,
      createdAt,
      postsPerPage,
      currentPage
    );
    
    // if(res.data.tasks.length === 0) setTodosStatus('all')
    if(res.data.tasks.length === 0 && currentPage >1) setCurrentPage(currentPage-1)
    setTodosCount(res.data.count);
    setFilteredTodos(res.data.tasks);

  }, [todosStatus, createdAt,currentPage, change]);

  const getTodos = async (filterBy, order, pp, page) => {
    try {
      const res = await api.get(`tasks/3`, {
        params: {
          filterBy: filterBy === 'all' ? '' : filterBy,
          order: order,
          pp: pp,
          page: page,
        },
      });
      return res;
      
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
    } catch (e) {
      alert(`Error: ${e.message}`);
      console.log(e.request);
    }
    setChange([]);
  };

  const chekTodo = async (id, status) => {
    try {
      await api.patch(`task/3/${id}`, { done: status});
    } catch (e) {
      alert(e.res.data);
      alert(e.res.status);
      alert(e.res.headers);
    }
    setChange([]);
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`task/3/${id}`);
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
    setChange([]);
  };

  const editTodo = async (input, id) => {
    try {
      await api.patch(`task/3/${id}`, { name: input });
      setChange([]);
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  const createdAtFilter = async (key) => setCreatedAt(key);

  const statusFilter = (key) => setTodosStatus(key);

  const paginate = (pageNumber) => {
    getTodos(todosStatus, createdAt, postsPerPage, pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="body">
      <h1 className="header">To-Do List</h1>
      <div className="container">
        <Creator createTodo={createTodo} />
        <Sorter
          todosStatus={todosStatus}
          statusFilter={statusFilter}
          createdAtFilter={createdAtFilter}
        />
        {todosCount === 0 ? (
          <div>No Tasks</div>
        ) : (
          <Tasks
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            filteredTodos={filteredTodos}
            chekTodo={chekTodo}
          />
        )}
        {todosCount > 5 && (
          <Pagination 
            current={currentPage} 
            pageSize={postsPerPage} 
            onChange={paginate} 
            total={todosCount}
          />
        )}
      </div>
    </div>
  );
}

export default App;
