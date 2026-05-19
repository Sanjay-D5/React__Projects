import { Search } from 'lucide-react'
import React, { useState } from 'react'
import BookCard from '../components/BookCard';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchBooks = async (e) => {
    e.preventDefault();
    if(!query.trim()) return;

    setError('')
    setLoading(true);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
      
      if(!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data = await res.json()
      setBooks(data.docs || []);
    } catch (error) {
      setError('Something went wrong. Please try again')
    } finally {
      setLoading(false);
    }
  }

  const hasResults = books.length > 0;
  const hasSearched = !loading && !error;

  return (
    <div className='min-h-screen px-4 py-10'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <h1 className='text-4xl font-bold text-center'>Discover your next <span className='text-indigo-500'>literary</span> journey</h1>

        <form onSubmit={searchBooks} className='relative w-full max-w-2xl mx-auto'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={20}/>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='border border-slate-700 rounded-3xl w-full pl-12 pr-36 py-4 bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring focus:ring-indigo-500'
            placeholder='Search for books by title, author...'
          />
          
          <button type='submit' disabled={loading || !query.trim()} className='absolute right-2 top-1/2 -translate-y-1/2 bg-rose-600 hover:bg-rose-500 text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>Search</button>
        </form>

        {error && <p className='text-red-400 text-center'>{error}</p> }

        {loading && (
          <div className='flex justify-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500'></div>
          </div>
        )}

        {/* Empty state — only after a search, not on first load */}
        {hasSearched && hasResults === false && books.length === 0 && query && (
          <p className='text-center text-slate-500'>No Books found for "{query}". Try a diffrent search</p>
        )}

        {!loading && hasResults && (
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4'>
          {books.map((book, index) => (
            <BookCard key={book.key || index} book={book}/>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home