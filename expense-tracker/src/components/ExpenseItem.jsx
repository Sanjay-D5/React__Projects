import React from 'react'

const ExpenseItem = ({key, expense, onDelete}) => {

  const formattedDate = expense.date 
  ? new Date(expense.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  }) 
  : null;

  return (
    <li className='flex justify-between items-center py-3'>
      <div>
        <p className='font-medium'>{expense.description}</p>
        <p className='text-gray-500 text-sm capitalize'>
          {expense.category} 
          {formattedDate && ` . ${formattedDate}`}
        </p>
      </div>


      <div className='flex items-center gap-4'>
        <span className='font-semibold'>₹{expense.amount.toFixed(2)}</span>
        <button
          onClick={() => onDelete(expense.id)}
          className='text-gray-400 hover:text-red-500 transition-colors cursor-pointer'
        >✕</button>
      </div>
    </li>
  )
}

export default ExpenseItem