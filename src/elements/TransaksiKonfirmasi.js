import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import swal from 'sweetalert';

function TransaksiKonfirmasi() {
    let [transaksi, setTransaksi] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [postsPerPage, setPostsPerPage] = useState(5);
    let navigate = useNavigate()

    useEffect(async () => {
        fetchTransaksi();
    }, [])

    const fetchTransaksi = async () => {
        await axios.get(api, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
            .then(result => {
                setTransaksi(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    const api = "http://localhost:4000/transaksi/konfirmasi/pembayaran";


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = transaksi.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (number) => setCurrentPage(number)


    return (
        <div>
            <div className="container m-auto ">
                <div className='w-full flex bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                    <Link to="/transaksi/"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></Link>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <div className='flex justify-between'>
                    <h1 className='font-semibold'>Silahkan Pilih Transaksi</h1>
                    <div className='flex'>
                        <h1>Cari pelanggan</h1>
                        <input type="text" className='border-[1px] ml-4' />
                    </div>
                    </div>
                    <p className='text-gray-400 text-sm my-1'>Pelanggan yang transaksi</p>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-white border-b">
                                        <tr>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Nama
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Invoice
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Status
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Pembayaran
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Total Harga
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPost?.map((hasil) => (
                                                <tr key={hasil.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.tb_transaksi.tb_member.nama}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.tb_transaksi.kode_invoice}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.tb_transaksi.status}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.tb_transaksi.dibayar}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.total_harga}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`/transaksi/bayar/${hasil.id_transaksi}`}><button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mx-2">Pilih</button></Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination postsPerPage={postsPerPage} totalPosts={transaksi.length} paginate={paginate} />
                </div>
            </div>
        </div>
    )
}

export default TransaksiKonfirmasi