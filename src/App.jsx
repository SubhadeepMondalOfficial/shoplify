import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin/Layout';
import { Dashboard } from './components/Admin/Dashbord';
import AdminProducts from './components/Admin/AdminProducts';
import NotFound from './components/pages/NotFound';
import Orders from './components/Admin/Orders';
import Payments from './components/Admin/Payments';
import Settings from './components/Admin/Settings';
import Customers from './components/Admin/Customers';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import Category from './components/pages/Category';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import ContactUs from './components/pages/ContactUs';
import PreGuard from './components/Guard/PreGuard';
import Cart from './components/pages/Cart';
import Profile from './components/pages/Profile';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/category' element={<Category />}/>
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route element={<PreGuard />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='/admin'>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<Orders />} />
          <Route path='payments' element={<Payments />} />
          <Route path='settings' element={<Settings />} />
          <Route path='customers' element={<Customers />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
