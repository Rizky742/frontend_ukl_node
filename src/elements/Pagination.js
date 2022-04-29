import React from 'react'

function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className=''>
            <ul className='flex'>
                {pageNumbers.map(number => (
                    <li onClick={() => paginate(number)} key={number} className="px-2 border-[1px] border-gray-400 cursor-pointer">{number}</li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination