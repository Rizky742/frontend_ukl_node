import axios from 'axios'
import React, { useEffect, useState } from 'react'
import currencyFormatter from 'currency-formatter';
import {BiDollar} from 'react-icons/bi'

function Laporan() {
    let [bulan,setBulan] = useState()
    let [tahun,setTahun] = useState()
    let [hari,setHari] = useState()
    let [laporan,setLaporan] = useState()

    useEffect(() => {
        getBulan()
        getTahun()
        getHari()
        getLaporan()
    },[])

    function getBulan(){
        axios.get(`http://localhost:4000/laporan/bulan/${sessionStorage.getItem('outlet')}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setBulan(currencyFormatter.format(result.data.total_pendapatan_bulan, { code: 'IDR' }))
        })
    }
    
    function getTahun(){
        axios.get(`http://localhost:4000/laporan/tahun/${sessionStorage.getItem('outlet')}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setTahun(currencyFormatter.format(result.data.total_pendapatan_tahun, { code: 'IDR' }))
        })
    }
    function getHari(){
        axios.get(`http://localhost:4000/laporan/hari/${sessionStorage.getItem('outlet')}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setHari(currencyFormatter.format(result.data.total_pendapatan_hari, { code: 'IDR' }))
        })
    }

    function getLaporan(){
        axios.get(`http://localhost:4000/laporan/final/${sessionStorage.getItem('outlet')}`, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(result => {
            setLaporan(result.data)
            console.log(result.data)
        })
    }

    function cetak(){
        window.print()
    }

    return (
        <div className='container m-auto'>
            <div className='flex justify-between'>
                <a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    {/* <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt="" /> */}
                    <span className='text-5xl text-green-400'><BiDollar/></span>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pendapatan Per Hari</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-green-400">{hari}</p>
                    </div>
                </a>
                <a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    {/* <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt="" /> */}
                    <span className='text-5xl text-green-400'><BiDollar/></span>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pendapatan Per Bulan</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-green-400">{bulan}</p>
                    </div>
                </a>
                <a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    {/* <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt="" /> */}
                    <span className='text-5xl text-green-400'><BiDollar/></span>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pendapatan Per Tahun</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-green-400">{tahun}</p>
                    </div>
                </a>
            </div>
            <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5 mt-4'>
                    <h1 className='font-semibold'>Laporan transaksi</h1>
                    <p className='text-gray-400 text-sm my-1'>Laporan yang terdaftar</p>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-white border-b">
                                            <tr>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Nama Paket
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Jumlah Transaksi
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Jumlah Transaksi (lunas)
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Jumlah Transaksi (belum lunas)
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Total Hasil (Lunas)
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Total Hasil (Belum Lunas)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {currentPost?.map((paket) => ( */}
                                                <tr  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {laporan?.nama_paket}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {laporan?.total_transaksi}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {laporan?.jmllunas}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {laporan?.jmlblmlunas}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {currencyFormatter.format(laporan?.total_harga_lunas, {code: 'IDR'})}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {currencyFormatter.format(laporan?.total_harga_belum_lunas, {code: 'IDR'})}
                                                    </td>
                                                    {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {paket.tb_outlet.nama}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {paket.jenis}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {currencyFormatter.format(paket.harga, {code: "IDR"})}
                                                    </td> */}
                                                    {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`/paket/edit/${paket.id}`}><button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mx-2">Edit</button></Link>
                                                        <button onClick={() => hapus(paket.id)} className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Hapus</button>
                                                    </td> */}
                                                </tr>
                                            {/* ))} */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p onClick={(e) => cetak()} className='max-w-min text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-nonedark:focus:ring-blue-800 cursor-pointer'>Cetak</p>
                    {/* <Pagination postsPerPage={postsPerPage} totalPosts={paket.length} paginate={paginate} /> */}
                </div>
        </div>
    )
}

export default Laporan