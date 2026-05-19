import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4'>
      <p className='text-6xl'>📚</p>
      <h1 className='text-3xl font-bold'>Page not found</h1>
      <p className='text-slate-400'>This page doesn't exist in our library.</p>
      <Link to='/' className='text-indigo-400 hover:underline'>
        Back to search
      </Link>
    </div>
  );
}