import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function TambahTransaksi() {
    let [nama, setNama] = useState()
    let [alamat, setAlamat] = useState()
    let [paketKirim, setPaketKirim] = useState()
    let [outlet, setOutlet] = useState(sessionStorage.getItem('outlet'))
    let [idMember, setIdMember] = useState()
    let [jumlah, setJumlah] = useState()
    let [diskon, setDiskon] = useState()
    let [pajak, setPajak] = useState()
    let [biayaTambahan, setBiayaTambahan] = useState()
    let [paket, setPaket] = useState([])
    let [namaOutlet, setNamaOutlet] = useState()
    let [telepon, setTelepon] = useState()
    let [invoice, setInvoice] = useState()
    const params = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        member();
        getPaket()
        axios.get(`http://localhost:4000/outlet/${outlet}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setNamaOutlet(result.data.nama)
        })
        setInvoice(`LNDRY${Date.now()}`)
        console.log(outlet)
    },[])


    function member(){
        axios.get(`http://localhost:4000/member/${params.id}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setNama(result.data.nama)
            setIdMember(result.data.id)
        })
    }

        function getOutlet(){
        
    }

    function getPaket() {
        axios.get(`http://localhost:4000/paket/test/${sessionStorage.getItem('outlet')}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setPaket(result.data)
        })
    }

    function submit(e) {
        e.preventDefault()
        let data = {
            id_outlet: outlet,
            id_member: idMember,
            invoice: invoice,
            biaya_tambahan : parseInt(biayaTambahan),
            diskon : parseInt(diskon),
            pajak : parseInt(pajak),
            id_user : sessionStorage.getItem('id'),
            // id_paket : paketKirim,
            // qty: parseInt(jumlah),
            detail_transaksi : [
                {
                    id_paket : paketKirim,
                    qty: parseInt(jumlah)
                }
            ]
        }
        axios.post('http://localhost:4000/transaksi/', data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(res => {
            console.log(res)
            if(res.data.status=="success"){
                swal("Sucess", "Sukses menambahkan transaksi", "success")
                .then(() => {
                    navigate('/transaksi/')
                })
            }else{
                swal("Error", "Gagal menambahkan transaksi", "error")
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
                    <NavLink to="/transaksi/member"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></NavLink>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold text-lg'>Tambah Transaksi</h1>
                    <p className='text-gray-400 text-sm my-1'>Tambahkan Transaksi</p>
                    <form className='mt-4' onSubmit={submit}>
                        <div className='w-full'>
                            <p className='text-base'>Nama Pelanggan</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setNama(e.target.value)} value={nama} name="nama" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Outlet</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2'  placeholder='Outlet' value={namaOutlet} name="Outlet" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Invoice</p>
                            <input type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setAlamat(e.target.value)} placeholder='Invoice' value={invoice} name="Invoice" disabled/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Paket</p>
                            <select type="text" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setPaketKirim(e.target.value)} placeholder='Jenis Kelamin' value={paketKirim} name="jenis_kelamin" required>
                                <option selected disabled value="">Pilih</option>
                                {paket?.map(hasil => (
                                    <option key={hasil.id} value={hasil.id}>{hasil.nama_paket}</option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Jumlah</p>
                            <input type="number" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setJumlah(e.target.value)} placeholder='Jumlah' value={jumlah} name="JUmlah" required/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Diskon (%)</p>
                            <input type="number" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setDiskon(e.target.value)} placeholder='Diskon' value={diskon} name="Diskon"/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Pajak (%)</p>
                            <input type="number" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setPajak(e.target.value)} placeholder='Pajak' value={pajak} name="Pajak"/>
                        </div>
                        <div className='w-full'>
                            <p className='text-base'>Biaya Tambahan</p>
                            <input type="number" className='w-full py-1 pl-5 border-[1px] my-2' onChange={(e) => setBiayaTambahan(e.target.value)} placeholder='Biaya Tambahan' value={biayaTambahan} name="Biaya Tambahan"/>
                        </div>
                        <button className='px-6 py-2 bg-gray-800 text-white rounded-md mt-3'>Submit</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default TambahTransaksi