import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Creator from './components/Creator/Creator';
import Scroll from './components/Scroll/Scroll';
import Sorter from './components/Sorter/Sorter';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosStatus, setTodosStatus] = useState('a');
  const [todosTimeFilter, setTodosTimeFilter] = useState('f');
  const lastTodoIndex = currentPage * 5;
  const firstTodoIndex = lastTodoIndex - 5;
  const currentTodos = filteredTodos.slice(firstTodoIndex, lastTodoIndex);

  useEffect(()=>{
    const getTodos = async () => {
      setLoading(true);
      const res = await axios.get(
        'https://todo-api-learning.herokuapp.com/v1/tasks/3?pp=10'
      );
      setTodos(res.data)
      setLoading(false)
    };
  
    getTodos();
  },[])
  
  useEffect(() => {

    let renderedTodos = []
    // checked filters
    {
      if (todosStatus === 'a') renderedTodos.push(...todos);
      if (todosStatus === 'd') {
        renderedTodos = todos.filter((todo) => todo.done === true);
        setCurrentPage(1);
      }
      if (todosStatus === 'u') {
        renderedTodos = todos.filter((todo) => todo.done === false);
        setCurrentPage(1);
      }
    }
    // createdAt filters
    todosTimeFilter === 'o'
      ? renderedTodos.sort((a, b) => a.createdAt - b.createdAt)
      : renderedTodos.sort((a, b) => b.createdAt - a.createdAt);

    if (renderedTodos.length === 0) setTodosStatus('a');

    setFilteredTodos(renderedTodos);
  }, [todos, todosStatus, todosTimeFilter]);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [filteredTodos]);

  const createTodo = (input) => {
    const todo = {
      uuid: Math.trunc(Math.random() * 10000),
      name: input,
      createdAt: new Date(),
      done: false,
      updatetAt: '',
    };
    if (!todo.name || /^\s*$/.test(todo.name)) {
      return; // убираем лишние пробелы и пустую строку
    }
    setTodos([todo, ...todos]);
  };

  const editTodo = (input, id) => {
    //редактируем пост -надо изменить функцию
    const n = todos.find((todo) => todo.uuid == id); // ищем пост, который редактируем в массиве
    n.name = input; //задаем новое значене тексту задачи в найденном посте
    todos.map((obj) => obj.name === input); // меняем пост в массиве
    setTodos(todos); //задаем стейт из отредактированного
  };

  const chekTodo = (id) =>
    setTodos(
      todos.filter((todo) => (todo.uuid === id ? (todo.done = !todo.done) : todo))
    );

  const checkedTodos = todos.filter((todo) => todo.done === true);
  const unCheckedTodos = todos.filter((todo) => todo.done === false);

  const createdAtFilter = (key) => setTodosTimeFilter(key);

  const statusFilter = (key) => setTodosStatus(key);

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.uuid !== id));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (filteredTodos.length !== 0 && currentTodos.length === 0) {
    paginate(currentPage - 1);
  }

  console.log(1);
  console.log(todos);

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
        {filteredTodos.length === 0 ? (
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
        {filteredTodos.length > 5 && (
          <Scroll
            paginate={paginate}
            postsNumber={filteredTodos.length}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;

// по максимуму рефакторить - но лушче переходить к беку и апишке
