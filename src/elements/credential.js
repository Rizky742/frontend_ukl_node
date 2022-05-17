import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Credential() {
    let [outlet, setOutlet] = useState()

    useEffect(() => {
        axios.get(`http://localhost:4000/outlet/${sessionStorage.getItem('outlet')}`, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
            .then(result => {
                setOutlet(result.data.nama)
            })
    }, [])
    function role() {
        if (sessionStorage.getItem('role') === "admin") {
            return "ADMIN PAGE"
        } else if (sessionStorage.getItem('role') === "kasir") {
            return "KASIR PAGE"
        } else {
            return "OWNER PAGE"
        }
    }
    return (
        <div className="container m-auto mt-5">
            <div className='w-ful flex justify-between bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                <h1 className='text-lg'>Selamat Datang, <span className='text-blue-400 font-bold'>{sessionStorage.getItem('nama')}</span></h1>
                <h1 className='font-semibold'>Outlet <span className='text-red-400'>{outlet}</span></h1>
                <h1 className='font-semibold'>{role()}</h1>
            </div>
        </div >

    )
}
