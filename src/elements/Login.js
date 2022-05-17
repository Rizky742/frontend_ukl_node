import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [minimal, setMinimal] = useState('')
    let [data, setData] = useState()
    let navigate = useNavigate()

    function masuk(e) {
        e.preventDefault()
        if (password.length <= 6) {
            setMinimal('Password harus lebih atau sama dengan 6 huruf')
        } else {
            setMinimal(null)
        }
        let Data = {
            "username": username,
            "password": password
        }
        axios.post('http://localhost:4000/login/', Data)
            .then(result => {
                setData(result.data)
                if (result.data.status == "success") {
                    navigate('/')
                    sessionStorage.setItem('token', result.data.acces_token)
                    sessionStorage.setItem('role', result.data.user.role)
                    sessionStorage.setItem('islogin', "login")
                    sessionStorage.setItem('outlet', result.data.user.id_outlet)
                    sessionStorage.setItem('id', result.data.user.id)
                    sessionStorage.setItem('nama', result.data.user.nama)
                }
            })

    }
    return (
        <div className='bg-blue-500 w-full h-screen'>
            <div className='flex justify-center items-center h-screen w-full'>
                <div className='px-32 py-20 bg-white rounded-lg'>
                    <h1 className='text-center mb-5 text-[30px] font-semibold'>Laundry</h1>
                    <form onSubmit={masuk}>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className='border-2 p-2 mb-4' placeholder='username' />
                        <p></p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='border-2 p-2' placeholder='password' />
                        <p>{data || minimal ? minimal || data.message : ""}</p>
                        <button type='submit' className='border-2 w-full mt-4 py-2 bg-blue-700 text-white'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login