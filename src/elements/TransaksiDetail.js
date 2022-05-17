import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import currencyFormatter from 'currency-formatter';

function TransaksiDetail() {
    let [nama, setNama] = useState()
    let [invoice, setInvoice] = useState()
    let [tagihan, setTagihan] = useState()
    let [outlet, setOutlet] = useState()
    let [paket, setPaket] = useState()
    let [status, setStatus] = useState()
    let [jumlah, setJumlah] = useState()
    let [totalHarga, setTotalHarga] = useState()
    let [totalBayar, setTotalBayar] = useState()
    let [tanggalPembayaran, setTanggalPembayaran] = useState()
    let [bayar, setBayar] = useState()
    let params = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/transaksi/${params.id}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setNama(result.data[0].tb_transaksi.tb_member.nama)
            setOutlet(result.data[0].tb_transaksi.tb_outlet.nama)
            setPaket(result.data[0].tb_paket.nama_paket)
            setInvoice(result.data[0].tb_transaksi.kode_invoice)
            setPaket(result.data[0].tb_paket.nama_paket)
            setJumlah(result.data[0].qty)
            setTotalHarga(currencyFormatter.format(result.data[0].total_harga, {code: 'IDR'}))
            setTotalBayar(currencyFormatter.format(result.data[0].total_bayar, {code: 'IDR'}))
            setTanggalPembayaran(result.data[0].tb_transaksi.tgl_bayar)
            console.log(result.data)
        })
    },[])

    function submit(e) {
        e.preventDefault()
        let data = {
            status : status
        }
        axios.put(`http://localhost:4000/transaksi/ubah-status/${params.id}`, data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(res => {
            if(res.data.status=="success"){
                swal("Sucess", "Ubah status Sukses", "success")
                .then(() => {
                    navigate('/transaksi/')
                })
            }
            else{
                swal("Error", "Ubah status Gagal", "error")
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
                    <NavLink to="/transaksi"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></NavLink>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold text-lg'>Detail Transaksi</h1>
                    <p className='text-gray-400 text-sm my-1'>Silahkan ubah status</p>
                    <form className='mt-4' onSubmit={submit}>
                    <div className='w-full'>
                            <p className='text-base'>Invoice</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' value={invoice} name="alamat" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Nama Pelanggan</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2'   value={nama} name="nama" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Outlet</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2'  value={outlet} name="outlet" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Paket</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' value={paket} name="paket" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Jumlah</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2'  value={jumlah} name="jumlah" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Total Harga</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2'value={totalHarga} name="total harga" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Total Bayar</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' value={totalBayar} name="total bayar" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Tanggal Pembayaran</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2'  value={tanggalPembayaran} name="tanggal pembayaran" disabled/>
                        </div>
                        {/* <div className='w-full'>
                            <p className='text-base'>Status</p>
                            <select type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setStatus(e.target.value)}  value={status} name="jenis_kelamin" required>
                                <option selected disabled value="">Pilih</option>
                               <option value="baru">baru</option>
                               <option value="proses">proses</option>
                               <option value="selesai">selesai</option>
                               <option value="diambil">diambil</option>
                            </select>
                        </div> */}
                        {/* <button className='px-6 py-2 bg-gray-800 text-white rounded-md mt-3'>Submit</button> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransaksiDetail