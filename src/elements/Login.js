import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    let [username,setUsername] = useState('')
    let [password,setPassword] = useState('')
    let [minimal,setMinimal] = useState('')
    let [data,setData] = useState()
    let navigate = useNavigate()

    function masuk(e) {
        e.preventDefault()
        if(password.length <= 6) {
            setMinimal('Password harus lebih atau sama dengan 6 huruf')
        }else{
            setMinimal(null)
        }
        let Data = {
            "username" : username,
            "password" : password
        }
        axios.post('http://localhost:4000/login/', Data)
        .then(result => {
            setData(result.data)
            if(result.data.status == "success"){
                navigate('/')
                sessionStorage.setItem('token', result.data.acces_token)
                sessionStorage.setItem('role', result.data.user.role)
                sessionStorage.setItem('islogin', "login")
            }
        })
        
    }
  return (
    <div className=''>
        <form onSubmit={masuk}>
            <p>username</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
            <p>Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <p>{data || minimal ? minimal || data.message : ""}</p>
            <button type='submit' className='border-2'>Masuk</button>
        </form>
    </div>
  )
}

export default Login