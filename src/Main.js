import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import Header from './elements/header';
import Error from './elements/Error';
import Coba from './elements/coba';
function Main() {
    let navigate = useNavigate()
   useEffect(() => {
    if(sessionStorage.getItem('islogin') !== "login"){
            navigate('/login')
        }
   },[]) 
    return (
        <div>
            <Header />
            <Routes>
                <Route path='*' element={<Error />}></Route>
                {sessionStorage.getItem('role') === 'kasir' || sessionStorage.getItem('role') === 'admin' ? <Route path='/outlet' element={<Outlet />}></Route> : '' }
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
            </Routes>
        </div>


    )
}

export default Main