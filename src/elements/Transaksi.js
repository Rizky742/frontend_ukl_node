import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import swal from 'sweetalert';
import currencyFormatter from 'currency-formatter';

function Transaksi() {
    let [transaksi, setTransaksi] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [postsPerPage, setPostsPerPage] = useState(5);
    let [isModal, setIsmodal] = useState(false);
    let [defaultStatus, setDefaultStatus] = useState();
    let [status, setStatus] = useState();
    let [idTransaksi, setIdTransaksi] = useState();
    let navigate = useNavigate()

    useEffect(async () => {
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        await axios.get(api, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
            .then(result => {
                setTransaksi(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }


    const api = `http://localhost:4000/transaksi/test/${sessionStorage.getItem('outlet')}`;


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = transaksi.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (number) => setCurrentPage(number)

    function muncul(status,id) {
        setIsmodal(true)
        setStatus(status)
        setIdTransaksi(id)
    }

    function hilang() {
        setIsmodal(false)
    }

    function ubahStatus(e) {
        e.preventDefault()
        setIsmodal(false)
        let data = {
            status : status
        }
        console.log(status)
        axios.put(`http://localhost:4000/transaksi/ubah-status/${idTransaksi}`, data, {
            headers : {'Authorization': 'Bearer '+sessionStorage.getItem('token')}
        })
        .then(res => {
            if(res.data.status=="success"){
                swal("Sucess", "Ubah status Sukses", "success")
                .then(() => {
                    fetchProduct()
                    navigate('/transaksi/')
                })
            }
            else{
                swal("Error", "Ubah status Gagal", "error")
                .then(() => {
                    fetchProduct()
                    navigate('/transaksi/')
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
        setStatus('')
    }

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
                        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
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
                    <Link to="/transaksi/member"><p className='px-7 py-2 rounded-md border-[1px] w-min border-black text-black hover:bg-black hover:text-white transition duration-200'>Tambah</p></Link>
                    <Link to="/transaksi/konfirmasi"><p className='ml-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-nonedark:focus:ring-blue-800'>Konfirmasi Pembayaran</p></Link>
                </div>
                <div className='w-full bg-white border-[1px] border-[#d8e0ec] p-5'>
                    <h1 className='font-semibold'>Daftar Transaksi</h1>
                    <p className='text-gray-400 text-sm my-1'>Transaksi yang terdaftar</p>
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
                                                        <p onClick={(e) => muncul(hasil.tb_transaksi.status, hasil.tb_transaksi.id)} className={`w-min cursor-pointer inline-block px-6 py-2 border-2 ${hasil.tb_transaksi.status === 'baru' ? "border-purple-600" : hasil.tb_transaksi.status === 'proses' ? "border-yellow-400" : hasil.tb_transaksi.status === 'selesai' ? "border-green-500" : "border-blue-600"} ${hasil.tb_transaksi.status === 'baru' ? "text-purple-600" : hasil.tb_transaksi.status === 'proses' ? "text-yellow-400" : hasil.tb_transaksi.status === 'selesai' ? "text-green-500" : "text-blue-600"}   font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}>{hasil.tb_transaksi.status}</p>
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <p className={`cursor-pointer w-min inline-block px-6 py-2 border-2 ${hasil.tb_transaksi.dibayar === "dibayar" ? "border-green-500" : "border-red-600"} ${hasil.tb_transaksi.dibayar === "dibayar" ? "text-green-500" : "text-red-600"} font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}>{hasil.tb_transaksi.dibayar === "belum_dibayar" ? "BELUM DIBAYAR" : hasil.tb_transaksi.dibayar}</p>
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {currencyFormatter.format(hasil.total_harga, { code: 'IDR' })}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`/transaksi/detail/${hasil.id_transaksi}`}><button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mx-2">Detail</button></Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class={`modal fade fixed top-0 left-0 w-full pt-16 h-full ${isModal ? "" : "hidden"} px-[750px] outline-none overflow-x-hidden overflow-y-auto transition-all bg-black bg-opacity-25`}
                                    id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog relative w-auto pointer-events-none">
                                        <div
                                            class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                            <div
                                                class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Ubah Status</h5>
                                                <button type="button"
                                                    class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body relative p-4">
                                                <select class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)} value={status}>
                                                    <option value='' selected>Pilih</option>
                                                    <option value="baru">baru</option>
                                                    <option value="proses">proses</option>
                                                    <option value="selesai">selesai</option>
                                                    <option value="diambil">diambil</option>
                                                </select>
                                            </div>
                                            <div
                                                class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                                <button type="button" class="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" data-bs-dismiss="modal" onClick={hilang}>Close</button>
                                                <button type="button" class="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1" onClick={ubahStatus}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
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

export default Transaksi