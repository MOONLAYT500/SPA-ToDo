import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Creator from './components/Creator/Creator';
import Sorter from './components/Sorter/Sorter';
import Tasks from './components/Tasks/Tasks';
import { Pagination, message } from 'antd';

function App() {
  const [filteredTodos, setFilteredTodos] = useState([]);//all tasks
  const [currentPage, setCurrentPage] = useState(1);//current page from pagination
  const [todosStatus, setTodosStatus] = useState('all'); // filter by done from sorter
  const [createdAt, setCreatedAt] = useState('desc'); // filter vu date from sorter
  const [todosCount, setTodosCount] = useState(0);//todos count from server
  const [postsPerPage, setPostsPerPage] = useState(5);// post per page 1
  const api = axios.create({
    baseURL: 'https://todo-api-learning.herokuapp.com/v1/',// creating baseURL
  });

  useEffect(() => {
    getTodos();// recieving todos from api and rendering page
  }, [todosStatus, createdAt, currentPage]); // triggers to render

  api.interceptors.response.use( // error han
    (response) => response,
    (error) => {
      let errorMessage;
      let res = error.request.response;
      if (!res) {
        errorMessage = 'No responce';
      }
      if (res === undefined) {
        errorMessage = 'Client side trouble';
      }
      if (error.response) {
        errorMessage = `${error.response.status}: ${error.response.data.message}`;
      }
      message.error(errorMessage);
    }
  );

  const getTodos = async () => {
    const res = await api.get(`tasks/3`, {
      params: {
        filterBy: todosStatus === 'all' ? '' : todosStatus,
        order: createdAt,
        pp: postsPerPage,
        page: currentPage,
      },
    });
    // if(res.data.tasks.length === 0) setTodosStatus('all')
    if (res.data.tasks.length === 0 && currentPage > 1){ 
    setCurrentPage(currentPage - 1)}
    setTodosCount(res.data.count);
    setFilteredTodos(res.data.tasks);
  };

  const createTodo = async (input) => {
    const todo = {
      name: input,
      done: false,
    };
    if (!todo.name || /^\s*$/.test(todo.name)) {
      message.error('Empty string not allowed');
      return;
    }
    await api.post(`task/3`, todo);
    await getTodos();
  };

  const editTodo = async (todo, id) => {
    let res = await api.patch(`task/3/${id}`, todo)
    await getTodos();
    return res;
  };

  const deleteTodo = async (id) => {
    await api.delete(`task/3/${id}`);
    await getTodos();
  };

  const createdAtFilter = async (key) => setCreatedAt(key);

  const statusFilter = async (key) => setTodosStatus(key);

  const paginate = (pageNumber) => {
    getTodos();
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
