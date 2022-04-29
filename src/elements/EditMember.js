import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

const api = "http://localhost:5000/product";
function EditMember() {
    let [nama, setNama] = useState()
    let [alamat, setAlamat] = useState()
    let [jenisKelamin, setJenisKelamin] = useState()
    let [telepon, setTelepon] = useState()
    const params = useParams()
    let navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:4000/member/${params.id}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setNama(result.data.nama)
            setAlamat(result.data.alamat)
            setJenisKelamin(result.data.jenis_kelamin)
            setTelepon(result.data.tlp)
        })
    },[])

    function submit(e) {
        e.preventDefault()
        let data = {
            nama: nama,
            alamat: alamat,
            jenis_kelamin: jenisKelamin,
            tlp: telepon,
        }
        axios.put(`http://localhost:4000/member/${params.id}`, data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(res => {
            if(res.data.status=="success"){
                swal("Sucess", "Sukses merubah member", "success")
                .then(() => {
                    navigate('/member/')
                })
            }else{
                swal("Error", "Gagal merubah member", "error")
                .then(() => {
                    navigate('/member/')
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
        setJenisKelamin('')
        setTelepon('')
    }

    return (
        <div>
            <div className="container m-auto mt-10">
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                    <NavLink to="/member"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></NavLink>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold text-lg'>Edit Member</h1>
                    <p className='text-gray-400 text-sm my-1'>Edit Member</p>
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
                            <p className='text-base'>Jenis Kelamin</p>
                            <select type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setJenisKelamin(e.target.value)} placeholder='Jenis Kelamin' value={jenisKelamin} name="jenis_kelamin" required>
                                <option selected disabled value="">Pilih</option>
                                <option value='L'>Laki-laki</option>
                                <option value='P'>Perempuan</option>
                            </select>
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

export default EditMember