import React from 'react'
import ExpenseItem from './ExpenseItem'

const ExpenseList = ({expenses, onDelete}) => {
  if(expenses.length === 0){
    return (
      <div className='bg-white p-4 shadow rounded-xl'>
        <p className='text-gray-500 text-center py-4'>No expenses found.</p>
      </div>
    )
  }

  return (
    <div className='bg-white p-4 shadow rounded-xl'>
      <h2 className='font-semibold text-xl mb-3'>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <ExpenseItem 
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
          />
        ))}
      </ul>
        
    </div>
  )
}

export default ExpenseList