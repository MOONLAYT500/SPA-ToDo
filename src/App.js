import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.less';
import Creator from './components/Creator/Creator';
import Sorter from './components/Sorter/Sorter';
import Tasks from './components/Tasks/Tasks';
import { Pagination, message } from 'antd';

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
    if (res.data.tasks.length === 0 && currentPage > 1)
      setCurrentPage(currentPage - 1);
    setTodosCount(res.data.count);
    setFilteredTodos(res.data.tasks);
  }, [todosStatus, createdAt, currentPage, change]);

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      let errorMessage
      let res= error.request.response
      if(!res){errorMessage = 'No responce'}
      if(res === undefined){}  
      if (error.response) {
        errorMessage = `${error.response.status}: ${error.response.data. 
          message}`}
      message.error(errorMessage)    
    }
  );

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
      alert(`Error: ${e.message}`);
    }
  };

  const createTodo = async (input) => {
    const todo = {
      name: input,
      done: false,
    };
    if (!todo.name || /^\s*$/.test(todo.name)) {
      message.error('Empty string not allowed')
      return;
    }
    await api.post(`task/3`, todo);
    setChange([]);
  };

  const editTodo = async (todo, id) => {
    await api.patch(`task/3/${id}`, todo);
    setChange([]);
  };

  const deleteTodo = async (id) => {
    await api.delete(`task/3/${id}`);
    setChange([]);
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
          />
        )}
        <Pagination
          style={{ marginTop: 'auto' }}
          current={currentPage}
          pageSize={postsPerPage}
          onChange={paginate}
          total={todosCount}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
}

export default App;
