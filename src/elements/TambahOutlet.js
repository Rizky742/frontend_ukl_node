import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

const api = "http://localhost:5000/product";
function TambahOutlet() {
    let [nama, setNama] = useState()
    let [alamat, setAlamat] = useState()
    let [telepon, setTelepon] = useState()
    let navigate = useNavigate()
    function submit(e) {
        e.preventDefault()
        let data = {
            nama: nama,
            alamat: alamat,
            tlp: telepon,
        }
        axios.post('http://localhost:4000/outlet/', data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(res => {
            if(res.data.status=="success"){
                swal("Sucess", "Sukses menambahkan outlet", "success")
                .then(() => {
                    navigate('/outlet/')
                })
            }else{
                swal("Error", "Gagal menambahkan outlet", "error")
                .then(() => {
                    navigate('/outlet/')
                })
            }
            console.log(res)
            clear()
        })
        .catch(error => {
            console.log(error)
        })
    }
    const clear = () => {
        setNama('')
        setAlamat('')
        setTelepon('')
    }

    return (
        <div>
            <div className="container m-auto ">
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                    <NavLink to="/outlet"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></NavLink>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold text-lg'>Tambah Outlet</h1>
                    <p className='text-gray-400 text-sm my-1'>Tambahkan product</p>
                    <form className='mt-4' onSubmit={submit}>
                        <div className='w-full'>
                            <p className='text-base'>Nama</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setNama(e.target.value)} placeholder='Nama' value={nama} name="nama" required/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Alamat</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setAlamat(e.target.value)} placeholder='Alamat' value={alamat} name="alamat" required/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Telepon</p>
                            <input type="number" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setTelepon(e.target.value)} placeholder='Telepon' value={telepon} name="telepon" required/>
                        </div>
                        <button className='px-6 py-2 bg-gray-800 text-white rounded-md mt-3'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TambahOutlet