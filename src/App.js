import swal from 'sweetalert';
import Header from './elements/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Input from './elements/input';
import Navbar from './elements/navbar';
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
import Error from './elements/Error';
import Main from './Main';
import Login from './elements/Login';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='*' element={<Main />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
