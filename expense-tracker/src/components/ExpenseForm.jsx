import React, { useRef, useState } from 'react'

const CATEGORIES = ['food', 'transport', 'entertainment', 'utilities', 'other'];

const INITIAL_FORM = {
  description : '',
  amount : '',
  category : 'food',
};

const ExpenseForm = ({onAddExpense}) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const descriptionRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(form.amount);

    if(!form.description.trim() || isNaN(amount) || amount <= 0){
      setError('Enter a valid description with a positive number');
      return;
    }

    const newExpense = {
      id : Date.now(),
      description : form.description.trim(),
      amount,
      category: form.category,
      date: new Date().toISOString(),
    };

    onAddExpense(newExpense);

    setForm(INITIAL_FORM);
    setError('');
    descriptionRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white rounded-xl p-4 shadow space-y-3 '>
      
      <h2 className='font-semibold text-xl'>Add Expense</h2>

      <input 
        type="text" 
        ref={descriptionRef}
        name='description'
        className='w-full border p-2 rounded' 
        value={form.description} 
        onChange={handleChange} 
        placeholder='Description'
      />
      
      <input 
        type="number"
        name='amount'
        className='w-full border p-2 rounded' 
        value={form.amount} 
        onChange={handleChange} 
        placeholder='Amount'
      />
      
      <select 
        value={form.category} 
        name='category'
        className='w-full border p-2 rounded'
        onChange={handleChange}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat} className='capitalize'>
            {cat}
          </option>
        ))}
      </select>

      {error && <p className='text-red-500 text-sm'>{error}</p> }

      <button 
        type='submit'
        disabled={!form.description.trim() || !form.amount}
        className='bg-blue-500 text-white py-2 px-4 cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded w-full' 
      >
        Add Expense
      </button>
    </form>
  )
}

export default ExpenseForm