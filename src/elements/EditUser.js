import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function EditUser() {
    let [nama, setNama] = useState()
    let [username, setUsername] = useState()
    let [password, setPassword] = useState()
    let [outletkirim, setOutletKirim] = useState()
    let [outlet, setOutlet] = useState()
    let [role, setRole] = useState()
    const params = useParams()
    let navigate = useNavigate()

    useEffect(async () => {
        fetchProduct();
        fetchOutlet();
    }, [])
    const fetchProduct = async () => {
        await axios.get(`http://localhost:4000/user/${params.id}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
            .then(result => {
                setNama(result.data.nama)
                setUsername(result.data.username)
                setOutletKirim(result.data.id_outlet)
                setRole(result.data.role)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const fetchOutlet = async () => {
        await axios.get(`http://localhost:4000/outlet`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
            .then(result => {
                setOutlet(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    function submit(e) {
        e.preventDefault()
        let data = {
            nama: nama,
            username: username,
            password: password,
            id_outlet: outletkirim,
            role: role,
        }
        axios.put(`http://localhost:4000/user/${params.id}`, data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
            .then(res => {
                if (res.data.status == "success") {
                    swal("Sucess", "Sukses merubah user", "success")
                        .then(() => {
                            navigate('/user/')
                        })
                } else {
                    swal("Error", "Gagal merubah user", "error")
                        .then(() => {
                            navigate('/user/')
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
        setRole('')
        setOutletKirim('')
    }
    console.log(outletkirim)
    return (
        <div>
            <div className="container m-auto ">
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                    <NavLink to="/user"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></NavLink>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold text-lg'>Tambah User</h1>
                    <p className='text-gray-400 text-sm my-1'>Tambahkan user</p>
                    <form className='mt-4' onSubmit={submit}>
                        <div className='w-full'>
                            <p className='text-base'>Nama</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setNama(e.target.value)} placeholder='Nama' value={nama} name="nama" required/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Username</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setUsername(e.target.value)} placeholder='Username' value={username} name="username" required/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Password</p>
                            <input type="password" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setPassword(e.target.value)} placeholder='Password' value={password} name="password"/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Outlet</p>
                            <select type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setOutletKirim(e.target.value)} value={outletkirim}  name="outlet" required>
                                <option disabled selected value="">Pilih</option>
                                {outlet?.map(hasil => (
                                    <option key={hasil.id} value={hasil.id}>{hasil.nama}</option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Role</p>
                            <select type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setRole(e.target.value)} placeholder='Role' value={role} name="role" required>
                                <option selected disabled value="">Pilih</option>
                                <option value='admin'>admin</option>
                                <option value='kasir'>kasir</option>
                                <option value='owner'>owner</option>
                            </select>
                        </div>
                        <button className='px-6 py-2 bg-gray-800 text-white rounded-md mt-3'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUser