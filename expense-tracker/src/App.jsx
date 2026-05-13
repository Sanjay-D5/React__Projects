import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseSummary from './components/ExpenseSummary'
import CategoryFilter from './components/CategoryFilter'
import ExpenseList from './components/ExpenseList'

const loadExpenses = () => {
  try {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const App = () => {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [filter, setFilter] = useState('all');
  
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Ref → Does NOT Cause Re-render
  // Reading .current during render gives LAST render's value
  // Writing .current in effect updates it AFTER this render commits
  const prevTotalRef = useRef(0);
  useEffect(() => {
    prevTotalRef.current = total;
  }, [total])
  

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }
  
  const visibleExpenses = filter === 'all' ? expenses : expenses.filter((e) => e.category === filter);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  
  useEffect(() => {
    document.title = `Expense Tracker -- ₹${total.toFixed(2)}`
    return () => {
      document.title = 'Expense Tracker';
    }
  }, [total])
  
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <h1 className='font-bold text-3xl text-center'>Expense Tracker</h1>
        
        {/* ExpenseForm */}
        <ExpenseForm onAddExpense={addExpense}/>
  
        {/* ExpenseSummary */}
        <ExpenseSummary 
        expenses={expenses} 
        total={total}
        prevTotal={prevTotalRef.current}
        />

        {/* CategoryFilter */}
        <CategoryFilter filter={filter} onFilterChange={setFilter} expenses={expenses}/>

        {/* ExpenseList */}
        <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense}/>
      </div>
      
    </div>
  )
}
 
export default App