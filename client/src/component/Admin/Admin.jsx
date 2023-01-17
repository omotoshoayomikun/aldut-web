import React from 'react'
import { Link, Outlet, NavLink } from 'react-router-dom'
import '../../styles/Admin.css'
// import { Outlet } from 'react-router-dom/dist'

const Admin = () => {
  return (
    <>
      <div className="container p-r">
        <h2>Admin</h2>
        <div className="d-f j-cs navs">
          <NavLink to='addvideo'>
            <div>
              Add Video
            </div>
          </NavLink>
          <NavLink to='addnudes'>
            <div>
              Add Nudes
            </div>
          </NavLink>
          <NavLink to='managevideo'>
            <div>
              Manage Video
            </div>
          </NavLink>
          <NavLink to='managenude'>
            <div>
              Manage Nudes
            </div>
          </NavLink>
          <NavLink to='addcategory'>
            <div>
              Add/Manage Categories
            </div>
          </NavLink>
        </div>
        <hr style={{ marginTop: '-2.4px' }} />
        <Outlet />
      </div>
    </>
  )
}

export default Admin
