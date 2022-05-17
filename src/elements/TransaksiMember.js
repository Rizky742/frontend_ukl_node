import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import swal from 'sweetalert';

function TransaksiMember() {
    let [member, setMember] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [postsPerPage, setPostsPerPage] = useState(5);
    let navigate = useNavigate()

    useEffect(async () => {
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        await axios.get(api, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
            .then(result => {
                setMember(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    const api = "http://localhost:4000/member";


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = member.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (number) => setCurrentPage(number)



    function hapus(id) {
        swal({
            title: "Apa anda yakin?",
            text: "Sekali hapus, anda tidak akan mengembalikannya!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:4000/member/${id}`, {
                        headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
                    })
                        .then((res) => {
                            if (res.data.status == "success") {
                                swal("Sucess", "Sukses menghapus member", "success")
                            } else {
                                swal("Error", "Gagal menghapus member", "error")
                            }
                            fetchProduct()
                        })

                }
            })
    }
    return (
        <div>
            <div className="container m-auto ">
                <div className='w-full flex bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                    <Link to="/transaksi/"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Kembali</p></Link>
                    <Link to="/transaksi/konfirmasi"><p className='ml-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-nonedark:focus:ring-blue-800'>Konfirmasi Pembayaran</p></Link>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold'>Silahkan Pilih Pelanggan</h1>
                    <p className='text-gray-400 text-sm my-1'>Pelanggan yang terdaftar</p>
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
                                                    Alamat
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Jenis Kelamin
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Telepon
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
                                                        {hasil.nama}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.alamat}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.jenis_kelamin}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.tlp}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`/transaksi/tambah/${hasil.id}`}><button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mx-2">Pilih</button></Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination postsPerPage={postsPerPage} totalPosts={member.length} paginate={paginate} />
                </div>
            </div>
        </div>
    )
}

export default TransaksiMember