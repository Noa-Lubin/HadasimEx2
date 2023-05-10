import React from 'react'
 import { Link } from 'react-router-dom'
 import '../css/home.css'

const Home = () => {
    return (
        <>
        <body >
            <h1>Hotel</h1><br></br>
        <Link to={"/logInManager"} className ='links'>כניסת מנהל</Link><br></br>
        <Link to={"/logIn"} id='sec' className ='links'> כניסת לקוח</Link>
        </body>
        </> 
    )
}
export default Home
