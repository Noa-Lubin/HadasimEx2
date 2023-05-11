import React, { useEffect, useState } from 'react'
import '../css/customers.css'
const ViewAllClients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3030/client/allClients`)
            .then(response => response.json())
            .then(response => setClients(response))
            .catch(err => alert("ERROR"))
    })


    return (
        <div>
            <h4 id='title'>Clients List</h4>
            <hr className='hr'></hr><hr className='hr'></hr><br></br>
            {
                clients.map ((x) =>
                    <div id='list' key={x.ID}>
                        <h5 className='details'>ID: {x.ID}     firstName: {x.firstName}     lastName: {x.lastName}    {<br></br>}
                         date of birth: {x.dateOfBirth}  phone: {x.phone}  mobile Phone: {x.mobilePhone}    {<br></br>} 
                         city: {x.city}    street: {x.street}   number: {x.numBuilding}</h5>
                        <hr className='hr'></hr>
                    </div>
                )
            }
        </div>

    )
}
export default ViewAllClients

