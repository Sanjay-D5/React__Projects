import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const getDescription = (desc) => {
  if (!desc) return null;
  if (typeof desc === 'string') return desc;
  return desc.value ?? null;
};

const BookDetails = () => {
  const {id} = useParams();
  const location = useLocation();

  // Use preloaded data from navigation state immediately
  // This means title/cover show instantly without waiting for fetch
  const preloaded = location.state?.book ?? null;

  const [details, setDetails] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
   const fetchDetails = async () => {
    setloading(true);
    setError('');
    try {
      const res = await fetch(`https://openlibrary.org/works/${id}.json`);
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setDetails(data);
      
    } catch (error) {
      setError("Failed to load book details.");
    } finally {
      setloading(false);
    }
   };

   fetchDetails();
  }, [id]);

  const coverId = details?.covers?.[0] ?? preloaded?.cover_i ?? null;

  console.log(coverId);
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;
  
    const title = details?.title ?? preloaded?.title ?? 'Unknown Title';
    const authors = preloaded?.author_name?.join(', ') ?? 'Unknown Author';
    const description = getDescription(details?.description);

  return (
    <div className='max-w-5xl mx-auto px-4 py-8 space-y-8'>
      <Link to='/' className='inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors'>
        <ArrowLeft  size={20}/> Back to Liberary
      </Link>

      {error && (
        <p className='text-center text-red-400 py-12'>{error}</p>
      )}
    
      <div className='flex flex-col gap-8'>
        <div className='w-48 shrink-0 mx-auto md:mx-0'>
          {coverUrl ? (
            <img src={coverUrl} alt={title} className='w-full rounded-xl shadow-lg shadow-indigo-500'/>
          ) : (
            <div className='w-full aspect-2/3 bg-slate-800 rounded-xl flex items-center justify-center text-slate-600'>
              📚
            </div>
          )}
        </div>

        <div className='space-y-3'>
          <h1 className='text-4xl font-bold my-2'>{title}</h1>

          <p className='text-slate-400'>{authors}</p>

          {preloaded?.first_publish_year && (
            <p className='text-sm text-slate-500'>
              First published: {preloaded.first_publish_year}
            </p>
          )}
          
          {details?.subjects && (
          <div className='flex flex-wrap gap-2 pt-2'>
            {details.subjects.slice(0, 9).map((sub, i) => (
              <span key={i} className='px-3 py-1 bg-slate-800 border border-slate-600 rounded-full capitalize text-xs'>{sub}</span>
            ))}
          </div>
          )}
        </div>
        
      </div>  
        

      <div>
        <h2 className='text-xl font-semibold border-b border-slate-700 mb-4 pb-2'>Synopsis</h2>

        {loading ? (
          <div className='animate-pulse space-y-2'>
            <div className='h-4 bg-slate-800 rounded w-full' />
            <div className='h-4 bg-slate-800 rounded w-5/6' />
            <div className='h-4 bg-slate-800 rounded w-4/6' />
          </div>
        ) : description ? (
          <p className='text-slate-300 leading-relaxed whitespace-pre-line'>
            {description}
          </p>
        ) : (
          <p className='text-slate-500'>No synopsis available</p>
        )}
      </div>
    </div>
  );
}

export default BookDetails