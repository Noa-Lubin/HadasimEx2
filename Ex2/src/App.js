import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react';
import Customer from '../src/js/customers';
import ViewAllClients from '../src/js/customers';

export default function App() {
  const[user,setUser]=useState(null);
  return (
    <ViewAllClients/>
    // <Router>
    //   <Routes>
    //     <Route path='/Home' element={<Home />} />
    //     <Route path='/customers' element={<  Customer />} />
    //   </Routes>
    //     {/* ניתוב לדף התחלתי */}
    //     <Route path='/' element={<Navigate to="/customers" replace={true} />} />
    // </Router>
  )

}


