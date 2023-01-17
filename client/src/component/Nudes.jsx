import React from 'react'
import { GiPhotoCamera } from 'react-icons/gi'
import ViewNude from './ViewNude'
import { Link, Outlet } from 'react-router-dom'

const Nudes = () => {

  const nudes = [
    {
      nudes: '/images/Deals.png',
      title: ' Pictures Of Daniella Jatto',
      category: ' PICTURES',
      quantity: '4'
    },
    {
      nudes: '/images/Deals.png',
      title: ' Pictures Of Daniella Jatto',
      category: ' PICTURES',
      quantity: '278'
    },
    {
      nudes: '/images/Deals.png',
      title: ' Pictures Of Daniella Jatto',
      category: ' PICTURES',
      quantity: '214'
    },
    {
      nudes: '/images/Deals.png',
      title: ' Pictures Of Daniella Jatto',
      category: ' PICTURES',
      quantity: '214'
    },
    {
      nudes: '/images/Deals.png',
      title: ' Pictures Of Daniella Jatto',
      category: ' PICTURES',
      quantity: '214'
    },
  ]

  return (
    <>
      <div className="container">
      <h2> Pictures</h2>
        <div className="wrapper">
          {
            nudes.map((data, i) => (
              <div className="wrap" key={i}>
                <Link to={`/nudes/${i}`}>
                <div className='p-r'>
                  <img
                    src={data.nudes}
                    className='lqa'
                  />
                  <div className='ggffd fs-2 d-f j-c a-i'>
                    <GiPhotoCamera size='20px' style={{marginBottom: '0px', marginRight: '5px'}} /> 
                    <div>{data.quantity}</div>
                  </div>
                </div>
                </Link>
                <Link to={`/nudes/${i}`}>
                <div className='bbtxt'>{data.title}</div>
                </Link>
                <div className='smalltxt'>{data.category}</div>
              </div>
            ))
          }
        </div>
      </div>
      <Outlet />
      {/* <ViewNude /> */}
    </>
  )
}

export default Nudes
