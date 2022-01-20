import { useEffect, useState } from 'react';
import './App.css';
import Creator from './components/Creator/Creator';
import Scroll from './components/Scroll/Scroll';
import Sorter from './components/Sorter/Sorter';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [todos, setTodos] = useState([]); //глобальный стейт, в который приходит пост после создания
  const [filteredTodos, setFilteredTodos] = useState(todos); // отфильтрованные по статусу посты в начальном стейте , меняються по выполненным/не выполненным
  const [currentPage, setCurrentPage] = useState(1); // текущая страница отображения постов
  const [todosStatus, setTodosStatus] = useState('a')
  const [todosTimeFilter, setTodosTimeFilter] = useState('f')
  const [todoDelete, setTodoDelete] = useState()

  const lastTodoIndex = currentPage * 5; //индекс последнего элемента на странице -умножаем текущую страницу на количетво постов на странице
  const firstTodoIndex = lastTodoIndex - 5; //индекс первого элемента - послдений элемент минус количество на странице
  const currentTodos = filteredTodos.slice(firstTodoIndex, lastTodoIndex); //текущая страница, вырезаем из массива постов элементы с певого по последний и получаем подмассив с количеством постов 5 и нужными индексами
  useEffect(() => {
    let renderedTodos = [...todos]
    // checked filters 
    {if (todosStatus === 'a') setFilteredTodos(renderedTodos)
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
    
    setFilteredTodos(renderedTodos)
    
  }, [todos,todosStatus,todosTimeFilter]);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [filteredTodos]);

  const createTodo = (input) => {
    //создание задачи
    const todo = {
      // формируем задачу
      id: Math.trunc(Math.random() * 10000), //рандомный айдишник
      text: input, //получаем текст из инпута
      date: new Date(), // создаем новую дату
      checked: false, // задаем посту то, что он не выполнен
    };

    if (!todo.text || /^\s*$/.test(todo.text)) {
      return; // убираем лишние пробелы и пустую строку
    }
    setTodos([todo, ...todos]); // задаем массив новых задач стейту
    
  };

  const editTodo = (input, id) => {
    //редактируем пост -надо изменить функцию
    const n = todos.find((todo) => todo.id == id); // ищем пост, который редактируем в массиве
    n.text = input; //задаем новое значене тексту задачи в найденном посте
    todos.map((obj) => obj.text === input); // меняем пост в массиве
    setTodos(todos); //задаем стейт из отредактированного
  };

  const chekTodo = (id) => setTodos(todos.filter((todo)=>todo.id === id ? todo.checked = !todo.checked : todo)) 
  // {
  //   // ставим статус выполненно
  //   const checkedTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       todo.checked = !todo.checked
  //     }
  //     return todo;
  //   });
  //   setTodos(checkedTodos); // обновляем стейт
  // };

  // setTodos(todos.map(todo)=>todo.id === id ? todo.shecked = !todo.checked : todo)

  const dateFilter = (key) => setTodosTimeFilter(key)


  const statusFilter = (key) => setTodosStatus(key)

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const paginate = (pageNumber) => setCurrentPage(pageNumber); // переключение по страницам - принимаем номер страницы и записываем его в стейт текущей страницы для отображения

  if (filteredTodos.length !== 0 && currentTodos.length === 0) {
    paginate(currentPage - 1);
  }

  return (
    <div className="body">
      <h1 className="header">To-Do List</h1>
      <div className="container">
        <Creator createTodo={createTodo} />
        <Sorter statusFilter={statusFilter} dateFilter={dateFilter} />
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
