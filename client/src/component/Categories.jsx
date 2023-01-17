import React from 'react'
import '../styles/Categories.css'
import { Link, Outlet } from 'react-router-dom'
import { AiFillCaretDown, AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom/dist'
import { useState } from 'react'

const Categories = () => {

  const navigate = useNavigate()

  const [filter, setfilter] = useState(false)

  const categories = [
    'kissing', 'real orgasm', 'stepbrother and stepsister', 'slim ebony', 'lightskin ebony',
    'kissing', 'real orgasm', 'stepbrother and stepsister', 'slim ebony', 'lightskin ebony',
    'real orgasm', 'stepbrother and stepsister', 'slim ebony', 'lightskin ebony', 'real orgasm', 'stepbrother and stepsister', 'slim ebony', 'lightskin ebony'
  ]

  const datas = [
    {
      video: '/videos/1.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
    {
      video: '/videos/word.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
    {
      video: '/videos/word.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
    {
      video: '/videos/1.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
    {
      video: '/videos/word.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
    {
      video: '/videos/word.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
    {
      video: '/videos/1.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
    {
      video: '/videos/word.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
    {
      video: '/videos/word.mp4',
      title: 'Married Woman Slept Off In Lovers House',
      category: 'LEAK VIDEO'
    },
  ]

  const controlVid = (e, sort) => {
    sort === 'move' ? e.play() : e.pause()
    // console.log(parseInt(e.duration /60, 10))
    // console.log(parseInt(e.duration))
    // console.log(parseInt(e.duration % 60))
    // console.log(parseInt(e.duration / 60))
  }


  const videoRouter = (params) => {
    navigate(`/video/${params}`)
  }


  return (


    <>
      <div className="container" >
        <div className='d-f j-cs a-i'>
          <h2>Masterbation Porn Video</h2>
          <div className="fs-2" style={{}}>
            Showing 1-32 of 27540
          </div>
        </div>
        <div className="">
          <div className="catFlex">
            <div className='flex1 nmqpl'>
              {/* THIS IS FOR BIGGER SCREEN */}
              <div className='badge fs-5 mb-3 w-inherit cvdisBi' style={{ textAlign: 'center', fontWeight: 'bold' }}>Filters</div>
              <div className="vcmx cvdisBi">
                {/* <div className="fs-5">Duration</div> */}
                <div className="fs-5 mb-1 d-f" style={{ fontWeight: 'bold', alignItems: 'center' }}>
                  <AiOutlinePlus />
                  Duration
                </div>

                <div className="range">
                  <div className="sliderValue">
                    <span>100</span>
                  </div>
                  <div className="field">
                    <div className="value left">0</div>
                    <input type="range" min="0" max="200" value='100' steps="1" />
                    <div className="value right">200</div>
                  </div>
                </div>

                <div className="fs-5 mb-1 d-f" style={{ fontWeight: 'bold', alignItems: 'center' }}>
                  <AiOutlinePlus />
                  Categories
                </div>
                {
                  categories.map((categorie, i) => (
                    <div key={i} className='fs-4 mb-1 ml-3'>
                      <Link>
                        {categorie}
                      </Link>
                    </div>
                  ))
                }
                <div className="p-r mt-4">
                  <hr />
                  <div className='moreVV' style={{ backgroundColor: 'grey', fontSize: '13px' }}>VIEW MORE</div>
                </div>
              </div>
              {/* ---------------------------------------------------------------- */}
              {/* THIS IS FOR SMALLER SCREEN TO DISPLAY THE FILTER PROPERTIES */}
              <div className='badge fs-5 mb-3 w-inherit d-f a-i j-cs cvdisSm' style={{ fontWeight: 'bold' }} onClick={() => setfilter(!filter)}>
                <div>
                  Filters
                </div>
                <AiFillCaretDown style={{ transform: filter ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all 0.5s' }} />
              </div>
              {/* ------------------------------------------------------------------------------- */}
              {
                filter && (
                  <div className="vcmx ">
                    {/* <div className="fs-5">Duration</div> */}
                    <div className="fs-5 mb-1 d-f" style={{ fontWeight: 'bold', alignItems: 'center' }}>
                      <AiOutlinePlus />
                      Duration
                    </div>

                    <div className="range">
                      <div className="sliderValue">
                        <span>100</span>
                      </div>
                      <div className="field">
                        <div className="value left">0</div>
                        <input type="range" min="0" max="200" value='100' steps="1" />
                        <div className="value right">200</div>
                      </div>
                    </div>

                    <div className="fs-5 mb-1 d-f" style={{ fontWeight: 'bold', alignItems: 'center' }}>
                      <AiOutlinePlus />
                      Categories
                    </div>
                    {
                      categories.map((categorie, i) => (
                        <div key={i} className='fs-4 mb-1 ml-3'>
                          <Link>
                            {categorie}
                          </Link>
                        </div>
                      ))
                    }
                   ` <div className="p-r mt-4">
                      <hr />
                      <div className='moreVV' style={{ backgroundColor: 'grey', fontSize: '13px' }}>VIEW MORE</div>
                    </div>`
                  </div>
                )
              }
            </div>


            <div className='flex3'>
              <div className="wrapper">
                {
                  datas.map((data, i) => (
                    <div className="wrap" key={i}>
                      <div className='p-r'>
                        <video
                          src={data.video}
                          muted
                          style={{ objectFit: 'cover' }}
                          className='video'
                          onMouseMove={(e) => controlVid(e.target, 'move')}
                          onMouseLeave={(e) => controlVid(e.target, 'leave')}
                          onClick={() => videoRouter(i)}
                        ></video>
                        <div className="dur">28:50</div>
                      </div>
                      <div className='bbtxt'>{data.title}</div>
                      <div className='smalltxt'>{data.category}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        {/* <nav>
        <Link to='featured'>Featured</Link>
        <Link to='new'>New</Link>
    </nav>
    <Outlet /> */}
      </div>
    </>

  )
}

export default Categories
