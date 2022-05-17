import axios from 'axios'
import React, { useEffect, useState } from 'react'
import fotoHome from  '../images/fotoHome.jpg'

function Home() {
    return (
        <div className="container m-auto">
            <div className=' bg-white border-[1px] border-[#d8e0ec]'>
                <img className='object-cover h-1/2' src={fotoHome} alt="" />
                <h1 className='text-center text-[35px]'>Selamat datang di web laundry</h1>
            </div>
        </div>
    )
}

export default Home