import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Menu from '@heroicons/react/outline/MenuIcon';
import Close from '@heroicons/react/outline/XIcon';

const list = [
    { name: "Home", link: "/" },
    { name: "User", link: "/user" },
    { name: "Outlet", link: "/outlet" },
    { name: "Paket", link: "/paket" },
    { name: "Member", link: "/member" },
    { name: "Transaksi", link: "/transaksi" },
]


export default function Header() {
    const [open, setOpen] = useState(false);
    let navigate = useNavigate()

    function keluar() {
        sessionStorage.clear()
        navigate('/login')
    }
    console.log(open)
    return (
        <div className='relative w-full shadow bg-white'>
            <div className='container sm:flex m-auto sm:justify-between items-center text-gray-700'>
                <NavLink to="/"><h1 className='group pl-8 py-4 text-xl font-semibold cursor-pointer bg-white relative z-6'>CobaWeb</h1></NavLink>
                <ul className={`text-center transition-all duration-200 ease-out relative ${open ? 'pb-4 sm:pb top-0 h-min' : '-top-[400px] h-0'} sm:flex sm:static cursor-pointer items-center text-base`}>
                    {/* {list.map((res) => (
                        <NavLink to={res.link} key={res.name}><li className={`px-2 py-2 hover:text-blue-400`}>{res.name}</li></NavLink>
                    ))} */}
                        <NavLink to={'/'}><li className="px-2 py-2 hover:text-blue-400">Home</li></NavLink>
                        <NavLink to={'/user'}><li className={`px-2 py-2 hover:text-blue-400 ${sessionStorage.getItem('role') === 'admin' ? "" : "hidden"}`}>User</li></NavLink>
                        <NavLink to={'/outlet'}><li className={`px-2 py-2 hover:text-blue-400  ${sessionStorage.getItem('role') === 'admin'  ? "" : "hidden"}`}>Outlet</li></NavLink>
                        <NavLink to={'/paket'}><li className={`px-2 py-2 hover:text-blue-400 ${sessionStorage.getItem('role') === 'admin' || sessionStorage.getItem('role') === 'kasir' ? "" : "hidden"}`}>Paket</li></NavLink>
                        <NavLink to={'/member'}><li className={`px-2 py-2 hover:text-blue-400 ${sessionStorage.getItem('role') === 'admin' || sessionStorage.getItem('role') === 'kasir' ? "" : "hidden"}`}>Member</li></NavLink>
                        <NavLink to={'/transaksi'}><li className={`px-2 py-2 hover:text-blue-400 ${sessionStorage.getItem('role') === 'admin' || sessionStorage.getItem('role') === 'kasir' ? "" : "hidden"}`}>Transaksi</li></NavLink>
                        <NavLink to={'/laporan'}><li className={`px-2 py-2 hover:text-blue-400 ${sessionStorage.getItem('role') === 'admin' || sessionStorage.getItem('role') === 'owner' ? "" : "hidden"}`}>Laporan</li></NavLink>
                    <p onClick={keluar} className={`block sm:hidden bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white mx-52 m`}>Keluar</p>
                </ul>
                <p onClick={keluar} className={`hidden sm:block sm:cursor-pointer bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white`}>Keluar</p>
                <Menu onClick={() => setOpen(!open)} className='text-black absolute top-4 right-6 sm:hidden cursor-pointer z-4' height={"2rem"} />
            </div>
        </div>
    )
}
