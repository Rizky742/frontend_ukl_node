import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
function TambahPaket() {
    let [nama, setNama] = useState()
    let [outletkirim, setOutletKirim] = useState()
    let [outlet, setOutlet] = useState()
    let [jenis, setJenis] = useState()
    let [harga, setHarga] = useState()
    let navigate = useNavigate()
    const api = "http://localhost:4000/outlet";

    useEffect(async () => {
        const fetchProduct = async () => {
            await axios.get(api, {
                headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
            })
                .then(result => {
                    setOutlet(result.data)
                })
                .catch(error => {
                    console.log(error);
                })
        }
        fetchProduct();
    }, [])
    console.log(outlet)

    function submit(e) {
        e.preventDefault()
        let data = {
            nama_paket: nama,
            id_outlet: outletkirim,
            jenis: jenis,
            harga: harga,
        }
        axios.post('http://localhost:4000/paket/', data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
            .then(res => {
                if (res.data.status == "success") {
                    swal("Sucess", "Sukses menambahkan paket", "success")
                        .then(() => {
                            navigate('/paket/')
                        })
                } else {
                    swal("Error", "Gagal menambahkan paket", "error")
                        .then(() => {
                            navigate('/paket/')
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
        setHarga('')
        setJenis('')
        setOutletKirim('')
    }
    console.log(outletkirim)
    return (
        <div>
            <div className="container m-auto ">
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                    <NavLink to="/paket"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></NavLink>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold text-lg'>Tambah Paket</h1>
                    <p className='text-gray-400 text-sm my-1'>Tambahkan paket</p>
                    <form className='mt-4' onSubmit={submit}>
                        <div className='w-full'>
                            <p className='text-base'>Nama</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setNama(e.target.value)} placeholder='Nama' value={nama} name="nama" required/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Outlet</p>
                            <select type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setOutletKirim(e.target.value)} value={outletkirim} name="outlet" required>
                                <option selected disabled value="">Pilih</option>
                                {outlet?.map(hasil => (
                                    <option key={hasil.id} value={hasil.id}>{hasil.nama}</option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Jenis</p>
                            <select type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setJenis(e.target.value)} placeholder='Jenis' value={jenis} name="jenis" required>
                                <option selected disabled value="">Pilih</option>
                                <option value='kiloan'>kiloan</option>
                                <option value='selimut'>selimut</option>
                                <option value='bed_cover'>bed cover</option>
                                <option value='kaos'>kaos</option>
                                <option value='lain'>lain</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Harga</p>
                            <input type="number" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setHarga(e.target.value)} placeholder='Harga' value={harga} name="harga" required/>
                        </div>
                        <button className='px-6 py-2 bg-gray-800 text-white rounded-md mt-3'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TambahPaket