import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({book}) => {

  const bookId = book.key?.split('/').pop() ?? '';
  const coverUrl = book.cover_i
  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
  : null;

  const authors = book.author_name?.join(', ') ?? 'Unknown Author';

  // Pass the search-result book data via location.state
  // BookDetails can use this immediately while its own fetch loads
  return (
    <Link to={`/book/${bookId}`} state={{book}} className='group rounded-xl overflow-hidden flex flex-col h-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/50'>
      <div className='aspect-2/3 w-full overflow-hidden bg-slate-800'>
        {coverUrl ? (
          <img src={coverUrl} 
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center text-slate-600 gap-2 text-center p-4'>
            <span className='text-3xl'>📚</span>
            <span className='text-xs'>{book.title}</span>
          </div>
        )}
        
      </div>

      <div className='p-4 flex flex-col grow bg-slate-900'>
        <h3 className='text-sm font-semibold mb-1 line-clamp-2'>{book.title}</h3>
        <p className='text-xs text-slate-500 '>{authors}</p>
        
        <div className='flex justify-between items-center text-xs text-slate-500 mt-auto'>
          <span>{book.first_publish_year ?? 'N/A'}</span>
          <span className='bg-slate-800 px-2 py-0.5 rounded-full'>
            {book.edition_count ?? 1} ed.
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BookCard