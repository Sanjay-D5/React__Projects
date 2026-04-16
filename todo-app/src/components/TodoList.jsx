import React from 'react'

const TodoItem = ({todo, onToggle, onDelete}) => {
  return (
    <li className='flex items-center justify-between p-3 bg-white border-b last:border-b-0 hover:bg-gray-50 transition-colors'>
      <div className='flex items-center gap-3'>
        <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)} 
        className='w-5 h-5 cursor-pointer'/>
        
        <span className={`text-lg transition-all ${ todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{todo.text}</span>
      </div>
    
      <button 
      onClick={() => onDelete(todo.id)}
      className='hover:text-[#c45c2e] hover:bg-[#cdc7c5] px-1 cursor-pointer transition-colors'>✕</button>
    </li>
  )
}

const TodoList = ({todos, onToggle, onDelete}) => {

  if (todos.length === 0) {
    return (
      <p className='text-center text-gray-500 py-6 italic'>
        No todos yet! Add one above
      </p>
    )
  }

  return (
    <ul className='border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete}/>
      ))}
    </ul>
    
  )
}

export default TodoList