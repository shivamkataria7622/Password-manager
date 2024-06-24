import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-purple-300 h-11 justify-around   items-center px-3 '>
        
        <div className="logo font-bold text-2xl">
            <span className='text-purple-500 '> &lt;</span>
            Pass
            <span className='text-purple-500 '>OP&gt; </span>

        </div>
        <ul>
            <li className='flex gap-3 m-3'> 
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold'  href="#">Contact</a>
            </li>           
        </ul>
    </nav>
  )
}

export default Navbar
