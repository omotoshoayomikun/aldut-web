import React, { useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/layout/Layout';
import './App.css';
import { NoMatch } from './component/404';
import Nudes, { About } from './component/Nudes';
import Videos from './component/Videos';
import { Home } from './component/Home';
import { Navbar } from './component/Navbar';
import OrderSummery from './component/OrderSummery';
import Categories, { Products } from './component/Categories';
import { UserDetails } from './component/UserDetails';
import { Users } from './component/Users';
import Admin from './component/Admin/Admin';
import AddVideos from './component/Admin/AddVideos';
import AddNudes from './component/Admin/AddNudes';
import AddCat from './component/Admin/AddCat';
import ManageVideo from './component/Admin/ManageVideo';
import ManageNude from './component/Admin/ManageNude';
import Login from './component/Admin/Login';
import ViewNude from './component/ViewNude';
import Contact from './component/Contact';
// import ManageCat from './component/Admin/ManageCat';

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='video/:videoId' element={<Videos />} />
          <Route path='category/:categoryId' element={<Categories />} />
          <Route path='nudes' element={<Nudes />}>
            <Route path=':nudeId' element={<ViewNude />} />
          </Route>
          <Route path='admin' element={<Admin />}>
            <Route index element={<AddVideos />} />
            <Route path='addvideo' element={<AddVideos />} />
            <Route path='addnudes' element={<AddNudes />} />
            <Route path='addcategory' element={<AddCat />} />
            <Route path='managevideo' element={<ManageVideo />} />
            <Route path='managenude' element={<ManageNude />} />
            {/* <Route path='managecategories' element={<ManageCat />} /> */}
          </Route>
          <Route path='contact' element={<Contact />} />
          <Route path='*' element={<NoMatch />} />
          <Route path='admin/login' element={<Login />} />
        </Routes>
      </Layout>
      {/* <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='order-summary' element={<OrderSummery />} />
        <Route path='products' element={<Products />}>
          <Route index element={<Featured />} />
          <Route path='featured' element={<Featured />} />
          <Route path='new' element={<New />} />
        </Route>
        <Route path='users' element={<Users />} />
        <Route path='users/:userId' element={< UserDetails />} />
        <Route path='*' element={<NoMatch />} />
      </Routes> */}
    </>
  );
}

export default App;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // const data = new FormData(e.target)
  //   // console.log(Object.fromEntries(data.entries()))
  // }