import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import currencyFormatter from 'currency-formatter';

function TransaksiBayar() {
    let [nama, setNama] = useState()
    let [invoice, setInvoice] = useState()
    let [tagihan, setTagihan] = useState()
    let [bayar, setBayar] = useState()
    let params = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/transaksi/konfirmasi/${params.id}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setNama(result.data[0].tb_transaksi.tb_member.nama)
            setInvoice(result.data[0].tb_transaksi.kode_invoice)
            setTagihan(currencyFormatter.format(result.data[0].total_harga, {code: 'IDR'}))
        })
    },[])
    console.log(params.id)

    function submit(e) {
        e.preventDefault()
        let data = {
            total_bayar : bayar
        }
        axios.put(`http://localhost:4000/transaksi/bayar/${params.id}`, data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(res => {
            if(res.data.status=="success"){
                swal("Sucess", "Pembayaran Sukses", "success")
                .then(() => {
                    navigate('/transaksi/')
                })
            }else if(res.data.message=="Maaf uang anda kurang"){
                swal("Error", "Maaf uang anda kurang", "error")
            }
            else{
                swal("Error", "Pembayaran Gagal", "error")
                .then(() => {
                    navigate('/transaksi/')
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className="container m-auto ">
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                    <NavLink to="/transaksi/konfirmasi"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></NavLink>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold text-lg'>Transaksi Bayar</h1>
                    <p className='text-gray-400 text-sm my-1'>Tambahkan Pembayaran</p>
                    <form className='mt-4' onSubmit={submit}>
                        <div className='w-full'>
                            <p className='text-base'>Nama Pelanggan</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setNama(e.target.value)} placeholder='Nama' value={nama} name="nama" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Invoice</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' value={invoice} name="alamat" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Jumlah Tagihan</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' value={tagihan} name="telepon" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Jumlah Bayar</p>
                            <input type="number" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setBayar(e.target.value)} placeholder='Jumlah Bayar' value={bayar} name="telepon" required/>
                        </div>
                        <button className='px-6 py-2 bg-gray-800 text-white rounded-md mt-3'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransaksiBayar