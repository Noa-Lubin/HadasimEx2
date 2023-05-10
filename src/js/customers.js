import React, { useEffect, useState } from 'react'
import '../css/customers.css'
const ViewAllClients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3030/client/allClients`)
            .then(response => response.json())
            .then(response => setClients(response))
            .catch(err => alert("ERROR"))
    }, [])


    return (
        <div>
            <h4 id='title'>רשימת לקוחות</h4>
            <hr className='hr'></hr><hr className='hr'></hr><br></br>
            {
                clients.map((x) =>
                    <div id='list' key={x.ID}>
                        <h5 className='details'>מספר לקוח: {x.ID}  שם פרטי: {x.firstName}  שם משפחה: {x.lastName}  מס' פלאפון: {x.phone}</h5>
                        <hr className='hr'></hr>
                    </div>
                )
            }
        </div>

    )
}
export default ViewAllClients

