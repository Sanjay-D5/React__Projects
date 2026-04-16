import { useEffect, useState } from 'react'

import './App.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('todos'));
    return saved ?? [];
  });
  const [filter, setFilter] = useState('all');


  function handleAddTodo() {
    if(!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  }
  
  // Compute visible todos based on the current filter tab
  const visibleTodos = todos.filter(todo => {
    if(filter === 'active') return !todo.completed;
    if(filter === 'completed') return todo.completed;
    return true; // 'all' 
  })

  // Toggle Completion 
  const handleToggle = (id) => {
    setTodos(todos.map((todo) => ((todo.id === id) ? {...todo, completed: !todo.completed} : todo)));
  };

  //Delete Todo
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Todo Count
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length

  // Storing in localStorage

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos])

  return (
    <div className='min-h-screen py-10 px-4 flex justify-center'>      
      <div className=" w-full max-w-3xl bg-[#fffdf9] p-6 border-2 border-[#fffdf9] rounded-lg shadow-lg h-fit">
        <h1 className='border-b border-gray-200 pb-4 mb-6 text-3xl '>Todo-List</h1>

        <TodoForm inputValue={inputValue} onInputChange={setInputValue} onAddTodo={handleAddTodo} />
          
        {/* Filter Tabs UI (Only show if there are todos) */}
        {todos.length > 0 && (
          <div className="flex justify-center gap-2 mb-4">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-[#c36d4b] text-[#fffdf9]' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* List uses visibleTodos instead of raw todos to respect the filter */}
        <TodoList todos={visibleTodos} onToggle={handleToggle} onDelete={handleDelete}/>
      
        {/* Todo count */}
        {todos.length > 0 && (
          <div className='mt-6 text-sm text-gray-500 text-center border-t pt-4'>
            <strong>{completedCount}</strong> of <strong>{totalCount}</strong> tasks completed
          </div>
        )}
      </div>
    </div>
    
  )
}

export default App
