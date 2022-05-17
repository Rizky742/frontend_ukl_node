import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function EditOutlet() {
    let [nama, setNama] = useState()
    let [alamat, setAlamat] = useState()
    let [telepon, setTelepon] = useState()
    const params = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/outlet/${params.id}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setNama(result.data.nama)
            setAlamat(result.data.alamat)
            setTelepon(result.data.tlp)
        })
    },[])

    function submit(e) {
        e.preventDefault()
        let data = {
            nama: nama,
            alamat: alamat,
            tlp: telepon,
        }
        axios.put(`http://localhost:4000/outlet/${params.id}`, data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(res => {
            if(res.data.status=="success"){
                swal("Sucess", "Sukses merubah outlet", "success")
                .then(() => {
                    navigate('/outlet/')
                })
            }else{
                swal("Error", "Gagal merubah outlet", "error")
                .then(() => {
                    navigate('/outlet/')
                })
            }
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
                    <h1 className='font-semibold text-lg'>Edit Outlet</h1>
                    <p className='text-gray-400 text-sm my-1'>Edit product</p>
                    <form className='mt-4' onSubmit={submit}>
                        <div className='w-full'>
                            <p className='text-base'>Nama</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setNama(e.target.value)} placeholder='Nama' value={nama} name="nama"/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Alamat</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setAlamat(e.target.value)} placeholder='Alamat' value={alamat} name="harga" />
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Telepon</p>
                            <input type="number" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setTelepon(e.target.value)} placeholder='Telepon' value={telepon} name="stock" />
                        </div>
                        <button className='px-6 py-2 bg-gray-800 text-white rounded-md mt-3'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditOutlet