import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Creator from './components/Creator/Creator';
import Sorter from './components/Sorter/Sorter';
import Tasks from './components/Tasks/Tasks';
import { Pagination, message } from 'antd';

function App() {
  const [filteredTodos, setFilteredTodos] = useState([]); //all tasks
  const [currentPage, setCurrentPage] = useState(1); //current page from pagination
  const [todosStatus, setTodosStatus] = useState('all'); // filter by done from sorter
  const [createdAt, setCreatedAt] = useState('desc'); // filter vu date from sorter
  const [todosCount, setTodosCount] = useState(0); //todos count from server
  const [postsPerPage, setPostsPerPage] = useState(5); // post per page 1
  const api = axios.create({
    baseURL: 'https://crud-api12.herokuapp.com/api/', // creating baseURL
  });

  useEffect(() => {
    getTodos(); // recieving todos from api and rendering page
  }, [todosStatus, createdAt, currentPage]); // triggers to render

  api.interceptors.response.use(
    // error han
    (response) => response,
    (error) => {
      let errorMessage;
      const res = error.request.response;
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
    // getting todos from server
    const res = await api.get(`todos`, {
      //sending request
      params: {
        // form new request
        filterBy: todosStatus === 'all' ? '' : todosStatus, // done status
        order: createdAt, // time status
        pp: postsPerPage, // todos on page count
        page: currentPage, // current page to return
      },
    });
    console.log(res);
    // if(res.data.tasks.length === 0) setTodosStatus('all')
    if (res.data.todos.length === 0 && currentPage > 1) {
      // return on previous page? if current is empty
      setCurrentPage(currentPage - 1);
    }

    setTodosCount(res.data.count); //seting total todos count
    setFilteredTodos(res.data.todos); // sitting final todos to render
  };

  const createTodo = async (input) => {
    // create and post new todo to server
    const todo = {
      //new todo
      name: input, // todo text
      done: false, // done status
    };
    if (!todo.name || /^\s*$/.test(todo.name)) {
      // empty string filter
      message.error('Empty string not allowed'); // message to client
      return;
    }
    await api.post(`todos`, todo); // posting new todo to api
    await getTodos(); // getting all todos to render
  };

  const editTodo = async (todo, id) => {
    let res = await api.patch(`todos/${id}`, todo); // sending edited todo to api
    await getTodos(); //rendering edited
    return res;
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`); // deleting todo by id
    await getTodos(); // rendering todos after deleting
  };

  const createdAtFilter = (key) => setCreatedAt(key); // setting time sattus to filter

  const statusFilter = (key) => setTodosStatus(key); // setting done status to filter

  const paginate = (pageNumber) => {
    getTodos(); // recieving todos
    setCurrentPage(pageNumber); //setting page to render
  };

  return (
    <div className="body">
      <h1 className="header">To-Do List</h1>
      <div className="container">
        <Creator createTodo={createTodo} />
        <Sorter statusFilter={statusFilter} createdAtFilter={createdAtFilter} />
        {todosCount === 0 ? (
          <div>No Tasks</div> // if filtered tasks is empty
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
          hideOnSinglePage={true} // hide pagination on single page
        />
      </div>
    </div>
  );
}

export default App;
