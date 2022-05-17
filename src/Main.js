import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Outlet from './elements/Outlet';
import TambahOutlet from './elements/TambahOutlet';
import EditOutlet from './elements/EditOutlet';
import Paket from './elements/Paket';
import TambahPaket from './elements/TambahPaket';
import EditPaket from './elements/EditPaket';
import Member from './elements/Member';
import TambahMember from './elements/TambahMember';
import EditMember from './elements/EditMember';
import User from './elements/User';
import TambahUser from './elements/TambahUser';
import Transaksi from './elements/Transaksi';
import Header from './elements/header';
import EditUser from './elements/EditUser';
import Error from './elements/Error';
import Coba from './elements/coba';
import TransaksiMember from './elements/TransaksiMember';
import TambahTransaksi from './elements/TambahTransaksi';
import TransaksiKonfirmasi from './elements/TransaksiKonfirmasi';
import TransaksiBayar from './elements/TransaksiBayar';
import TransaksiDetail from './elements/TransaksiDetail';
import Credential from './elements/credential';
import Home from './elements/Home';
import Laporan from './elements/Laporan';
function Main() {
    let navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)
   useEffect(() => {
    if(sessionStorage.getItem('islogin') !== "login"){
            navigate('/login')
        }
   },[]) 
   
    return (
        <div>
            <Header />
            <Credential />
            <Routes>
                <Route path='*' element={<Error />}></Route>
                {sessionStorage.getItem('role') === 'kasir' || sessionStorage.getItem('role') === 'admin' ? <Route path='/outlet' element={<Outlet />}></Route> : '' }
                <Route path='/' element={<Home />}></Route>
                <Route path='/outlet/tambah' element={<TambahOutlet />}></Route>
                <Route path='/outlet/edit/:id' element={<EditOutlet />}></Route>
                <Route path='/paket' element={<Paket />}></Route>
                <Route path='/paket/tambah' element={<TambahPaket />}></Route>
                <Route path='/paket/edit/:id' element={<EditPaket />}></Route>
                <Route path='/member' element={<Member />}></Route>
                <Route path='/member/tambah' element={<TambahMember />}></Route>
                <Route path='/member/edit/:id' element={<EditMember />}></Route>
                {sessionStorage.getItem('role') ==  'admin' ? <Route path='/user' element={<User />}></Route> : '' }
                <Route path='/user/tambah' element={<TambahUser />}></Route>
                <Route path='/user/edit/:id' element={<EditUser />}></Route>
                <Route path='/transaksi/' element={<Transaksi />}></Route>
                <Route path='/transaksi/member' element={<TransaksiMember />}></Route>
                <Route path='/transaksi/tambah/:id' element={<TambahTransaksi />}></Route>
                <Route path='/transaksi/konfirmasi' element={<TransaksiKonfirmasi />}></Route>
                <Route path='/transaksi/bayar/:id' element={<TransaksiBayar />}></Route>
                <Route path='/transaksi/detail/:id' element={<TransaksiDetail />}></Route>
                <Route path='/laporan/' element={<Laporan />}></Route>
            </Routes>
        </div>


    )
}

export default Main