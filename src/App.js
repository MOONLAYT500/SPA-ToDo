import { useEffect, useState } from 'react';
import './App.css';
import Creator from './components/Creator/Creator';
import Scroll from './components/Scroll/Scroll';
import Sorter from './components/Sorter/Sorter';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosStatus, setTodosStatus] = useState('a')
  const [todosTimeFilter, setTodosTimeFilter] = useState('f')
  const lastTodoIndex = currentPage * 5; 
  const firstTodoIndex = lastTodoIndex - 5; 
  const currentTodos = filteredTodos.slice(firstTodoIndex, lastTodoIndex); 
  
  useEffect(() => {
    let renderedTodos = []
    

    // checked filters 
    {if (todosStatus === 'a') renderedTodos.push(...todos)
    if (todosStatus === 'd') {
      renderedTodos = todos.filter((todo) => todo.checked === true)
      setCurrentPage(1)
    }
    if (todosStatus === 'u') {
      renderedTodos = todos.filter((todo) => todo.checked === false)
      setCurrentPage(1)
    }}
    
    // date filters  
    todosTimeFilter === 'o' ? renderedTodos.sort((a, b) => a.date - b.date) :  renderedTodos.sort((a, b) => b.date - a.date) 
    
    if(renderedTodos.length === 0) setTodosStatus('a')
    
    setFilteredTodos(renderedTodos)  
  }, [todos,todosStatus,todosTimeFilter]);

  useEffect(() => {
    
    setCurrentPage(currentPage);
  }, [filteredTodos]);


  

  const createTodo = (input) => {
    const todo = {
      id: Math.trunc(Math.random() * 10000),
      text: input,
      date: new Date(),
      checked: false,
    };
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return; // убираем лишние пробелы и пустую строку
    }
    setTodos([todo, ...todos]);
  };

  const editTodo = (input, id) => {
    //редактируем пост -надо изменить функцию
    const n = todos.find((todo) => todo.id == id); // ищем пост, который редактируем в массиве
    n.text = input; //задаем новое значене тексту задачи в найденном посте
    todos.map((obj) => obj.text === input); // меняем пост в массиве
    setTodos(todos); //задаем стейт из отредактированного
  };

  const chekTodo = (id) => setTodos(todos.filter((todo)=>todo.id === id ? todo.checked = !todo.checked : todo)) 

  const checkedTodos=todos.filter(todo=>todo.checked === true)
  const unCheckedTodos=todos.filter(todo=>todo.checked === false)
  

  const dateFilter = (key) => setTodosTimeFilter(key)


  const statusFilter = (key) => setTodosStatus(key)

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (filteredTodos.length !== 0 && currentTodos.length === 0) {
    paginate(currentPage - 1);
  }

  return (
    <div className="body">
      <h1 className="header">To-Do List</h1>
      <div className="container">
        <Creator createTodo={createTodo} />
        <Sorter 
          todosStatus={todosStatus} 
          statusFilter={statusFilter} 
          dateFilter={dateFilter}
          checkedTodos={checkedTodos}
          unCheckedTodos ={unCheckedTodos}/>
        <Tasks
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          filteredTodos={filteredTodos}
          chekTodo={chekTodo}
          currentTodos={currentTodos}
        />
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
