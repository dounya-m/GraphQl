import React from 'react'
function Header() {
return (
    <div className='flex justify-between items-center px-8 py-4'>
        <div className='relative'>
            <a  href='/' className='relative font-bold text-2xl text-violet-900'>Gowork*</a>
            <p className=' bg-purple-200 absolute w-[1.5rem] h-[1.5rem] rounded-full ml-[80%] -mt-[30%] -z-10'></p>
        </div>
        <div>
            <ul className='flex gap-[4rem]'>
            <a href='/' className='text-gray-600 hover:text-violet-800 font-semibold'>Home</a>              
            <a href='/' className='text-gray-600 hover:text-violet-800 font-semibold'>About</a>
            <a href='/' className='text-gray-600 hover:text-violet-800 font-semibold'>Contact</a>
            </ul>
        </div>
        <div className='flex gap-[2rem]' >
        <button><a href='/login'>Login</a></button>
        <button className='text-white bg-violet-500 px-3 py-2 rounded-lg hover:bg-violet-700'><a href='register'>Sign up</a></button>
        </div>
    </div>
)
}

export default Header
