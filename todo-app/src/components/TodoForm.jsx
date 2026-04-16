import React from 'react'

const TodoForm = ({inputValue, onInputChange, onAddTodo}) => {
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            onAddTodo();
        }
    }
  return (
   
    <div className='flex gap-2 mb-6'>
        <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => onInputChange(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder='Enter your task...' 
            className='flex-1 px-4 py-2 bg-[#f5f0e8] border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#eabca9]'
        />
        <button 
            className='py-2 px-6 text-lg bg-[#c45c2e] text-white rounded-sm cursor-pointer hover:bg-[#ab6446]' 
            onClick={onAddTodo}
            disabled={!inputValue.trim()}
        >
            Add task
        </button>
    </div>
   
  )
}

export default TodoForm