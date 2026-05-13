import React from 'react'

const CategoryFilter = ({filter, onFilterChange, expenses}) => {

  const categories = [
    'all',
    ...new Set(expenses.map((e) => e.category)),
  ];
  
  return (
    <div className='bg-white p-4 rounded-xl shadow'>
      <select 
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className='w-full border rounded p-2'
      >
        {categories.map((cat) => (
          <option key={cat} value={cat} className='capitalize'>
            {cat}
          </option>
        ))}
        
      </select>
    </div>
  )
}

export default CategoryFilter