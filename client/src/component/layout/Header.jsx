import React from 'react'
import '../../styles/Header.css'
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../forms/Search';
import Search from '../forms/Search';

function Header() {

  const [collapes, setCollapes] = useState({
    category: false,
    menu: false
  })

  return (
    <>
      <div className='cont'>
        <div className="logoCon">LOGO</div>
        <div className="navLinks">
          <Search />
          <div className="links">
            <Link to='/'>
              Home
            </Link>
          </div>
          {/* <div className="links">Porns</div> */}
          <div className="links p-r"
            onClick={() => setCollapes({ ...collapes, category: !collapes.category })}
          // onBlur={() => setCollapes({ ...collapes, category: false })}
          >
            <div className='d-f a-i'> Categories
              <AiFillCaretDown style={{ transform: collapes.category ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all 0.5s' }} />
            </div>
            {
              collapes.category && (
                <div className='box p-a'>
                  {/* <div className=""> */}
                  {/* <div className='box-link'>
                    All
                    <small className='til'>52340</small>
                  </div> */}
                  <Link to='/category/masterbate'>
                    <div className='box-link'>Masterbation
                      <small className='til'>2210</small>
                    </div>
                  </Link>
                  <div className='box-link'>Matured
                    <small className='til'>220</small>
                  </div>
                  <div className='box-link'>Teens
                    <small className='til'>220</small>
                  </div>
                  <div className='box-link'>Amature
                    <small className='til'>500</small>
                  </div>
                  <div className='box-link'>Ebony
                    <small className='til'>18</small>
                  </div>
                  <div className='box-link'>Anal
                    <small className='til'>220</small>
                  </div>
                  <div className='box-link'>Lesbian
                    <small className='til'>220</small>
                  </div>
                  <div className='box-link'>Thresome
                    <small className='til'>560</small>
                  </div>
                  <div className='box-link'>Public
                    <small className='til'>20</small>
                  </div>
                  <div className="p-r mt-3">
                    <hr />
                    <div className='moreVV' style={{ backgroundColor: '#fff', fontSize: '12px' }}>VIEW MORE</div>
                  </div>
                  {/* </div> */}
                </div>
              )
            }
          </div>
          <div className="links">
            <Link to='/nudes'>
              Photos
              {/* Nudes */}
            </Link>
          </div>
          <div className="links">
            <Link to='/contact'>
              Contacts
            </Link>
          </div>
          {/* <div className="links">Porn Sites</div> */}
        </div>
      </div>


      {/* THIS IS FOR SMALLER SCREEN MENU */}
      <div className="p-r xssss">
        <div className="contX">
          <div className="menu-icon" style={{ display: 'flex', alignItems: 'center' }} onClick={() => setCollapes({ ...collapes, menu: !collapes.menu })}>
            <AiOutlineMenu />
          </div>
        </div>
        {
          collapes.menu && (
            <div className="sub-menu">
              <div className="sub-box">
                <div className='box-link'>Home </div><hr />
                <div className='box-link'>Categories </div><hr />
                <div className='box-link'>Nudes </div><hr />
                <div className='box-link'>Contact </div><hr />
                <div className='box-link'>Porn Site </div> <hr />
              </div>
            </div>
          )
        }

      </div>

    </>
  )
}

export default Header
