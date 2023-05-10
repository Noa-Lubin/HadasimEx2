import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react';
import Home from '../src/js//Home';
import LogIn from '../src/js/logIn';
import Customer from '../src/js/customers';

export default function App() {
  const[user,setUser]=useState(null);
  return (
    <Router>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/customers' element={<  Customer />} />
        <Route path='/logIn' element={< LogIn />} />
      </Routes>
        {/* ניתוב לדף התחלתי */}
        <Route path='/' element={<Navigate to="/customers" replace={true} />} />
    </Router>
  )

}
