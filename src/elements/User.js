import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import swal from 'sweetalert';

function User() {
    let [user, setUser] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [postsPerPage, setPostsPerPage] = useState(5);

    useEffect(() => {
        fetchProduct();
    }, [])

    const api = "http://localhost:4000/user";

    const fetchProduct = async () => {
        await axios.get(api, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
            .then(result => {
                setUser(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = user.slice(indexOfFirstPost, indexOfLastPost);

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
                    axios.delete(`http://localhost:4000/user/${id}`, {
                        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
                    })
                        .then((res) => {
                            console.log(res.data)
                            if (res.data.status == "success") {
                                swal("Sucess", "Sukses menghapus user", "success")
                            } else {
                                swal("Error", "Gagal menghapus user", "error")
                            }
                            fetchProduct()
                        })

                }
            })
    }


    return (
        <div>
            <div className="container m-auto ">
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5 mb-4'>
                    <Link to="/user/tambah"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Tambah</p></Link>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold'>Daftar User</h1>
                    <p className='text-gray-400 text-sm my-1'>User yang terdaftar</p>
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
                                                    Username
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Outlet
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Role
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
                                                        {hasil.username}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.tb_outlet.nama}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {hasil.role}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`/user/edit/${hasil.id}`}><button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mx-2">Edit</button></Link>
                                                        <button onClick={() => hapus(hasil.id)} className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Hapus</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination postsPerPage={postsPerPage} totalPosts={user.length} paginate={paginate} />
                </div>
            </div>
        </div>
    )
}

export default User