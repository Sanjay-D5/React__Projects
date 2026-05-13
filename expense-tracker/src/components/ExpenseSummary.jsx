import React from 'react'

const ExpenseSummary = ({expenses, total, prevTotal}) => {

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {})

  const delta = total - prevTotal;

  return (
    <div className='bg-white shadow rounded-xl p-4 space-y-3'>
      <h2 className='font-semibold text-xl'>Summary</h2>

      <div className='flex items-baseline gap-3'>
        <p className='text-2xl font-bold'>₹{total.toFixed(2)}</p>
        {expenses.length > 0 && (
          <p className='text-sm text-gray-500'>
            {delta >= 0 ? '+' : ''}₹{delta.toFixed(2)} from last change
          </p>
        )}
      </div>
    
      <div className='space-y-1'>
        {Object.entries(categoryTotals).map(([cat, amt]) => (
          <div key={cat} className='flex justify-between text-sm'>
            <span className='capitalize'>{cat}</span>
            <span>₹{amt.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseSummary