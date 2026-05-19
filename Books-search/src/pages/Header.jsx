import { LibraryBig } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const navLinkClass = ({isActive}) => `font-medium transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'}`;

function Header() {
  return (
    <nav className='sticky top-0 z-50 py-4 px-6 bg-slate-900 border-b border-slate-700'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
            <NavLink to="/" className='text-2xl font-semibold flex items-center gap-3 hover:text-indigo-500 transition-colors'>
                <LibraryBig size={26} />
                <span>BookBase</span>
            </NavLink>
            <div className='flex gap-5'>
                <NavLink to='/' className={navLinkClass} end>
                    Home
                </NavLink>
            </div>
        </div>
    </nav>
   
    
  )
}

export default Header