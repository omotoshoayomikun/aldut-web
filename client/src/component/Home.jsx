import React, { useState } from 'react'
import { useRef } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import Pagnation from './forms/Pagnation'
// import { datas } from '../Logic/datas/ListOfVideos'
import { useEffect } from 'react'
import axios from 'axios'
import { Spinner } from './forms/Spinner'
import { baseUrl } from './utils/url'

export const Home = () => {
  const navigate = useNavigate()

  const [datas, setDatas] = useState([])
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/video`)
        setDatas(response.data)
        setSpinner(false)
        
      } catch (err) {
        setSpinner(false)
        console.log(err);
      }
    }

    getData()
  }, [])



  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(8)

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = datas.slice(indexOfFirstPost, indexOfLastPost)


  const [pageNumLimit, setPageNumLimit] = useState(5)
  const [maxPageNumLimit, setmaxPageNumLimit] = useState(5)
  const [minPageNumLimit, setminPageNumLimit] = useState(0)


  const badges = [
    'kissing', 'real orgasm', 'stepbrother and stepsister',
    'slim ebony', 'lightskin ebony', 'kissing', 'real orgasm',
    'stepbrother and stepsister', 'slim ebony', 'lightskin ebony',
    'slim ebony', 'lightskin ebony', 'kissing', 'real orgasm',
    'stepbrother and stepsister', 'slim ebony', 'lightskin ebony',
  ]

  const videoEl = useRef(null);

  // console.log(videoEl.rrent);

  const controlVid = (e, sort) => {
    sort === 'move' ? e.play() : e.pause()

  }

  const videoRouter = (params) => {
    navigate(`video/${params}`)
  }


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlePagNext = (pageNumbers) => {
    if (currentPage !== pageNumbers[pageNumbers.length - 1]) {

      setCurrentPage(currentPage + 1)

      if (currentPage + 1 > maxPageNumLimit) {
        setmaxPageNumLimit(maxPageNumLimit + pageNumLimit)
        setminPageNumLimit(minPageNumLimit + pageNumLimit)
      }
    }
  }

  const handlePagPrev = (pageNumbers) => {

    if (currentPage !== pageNumbers[0]) {

      setCurrentPage(currentPage - 1)

      if ((currentPage - 1) % pageNumLimit == 0) {
        setmaxPageNumLimit(maxPageNumLimit - pageNumLimit)
        setminPageNumLimit(minPageNumLimit - pageNumLimit)
      }
    }
  }

  const [track, settrack] = useState({
    X: '',
    Y: '',
  })

  // console.log(`ScreenX: ${track.X} and ScreenY: ${track.Y}`)

  const [trans, setTrans] = useState(0)
  console.log(trans)



  const handleLoadedMetadata = () => {
    const vid = videoEl.current.duration
    console.log(Math.floor((vid / 3600)))
    console.log(Math.floor((vid % 3600) / 60))
    console.log(Math.floor((vid % 60)))
  }


  if (spinner) {
    return <Spinner />
  }

  return (
    <>
      <div className="container" style={{ paddingTop: '0px' }}>

        <div id='test' className="d-f sliderBadge mb-2" onScroll={(e) => {
          const oo = document.getElementById('test').scrollLeft
          setTrans(Number(oo))

        }}>
          <div className="arrowCon arrLeft">
            <div className="arrow" onClick={() => {
              trans != 0 ? setTrans(Number(trans) + 100) : setTrans(trans)
            }}>
              <AiOutlineLeft />
            </div>
          </div>
          <div className='d-f' style={{ transform: `translateX(${trans}px)` }}>
            {
              badges.map((badge, i) => (
                <div className="badge" key={i} style={{ margin: '15px 10px', }}>
                  {badge}
                </div>
              ))
            }
          </div>
          <div className="arrowCon arrRight" onClick={() => {
            setTrans(Number(trans) - 100)
          }}>
            <div className="arrow">
              <AiOutlineRight />
            </div>
          </div>
        </div>

        {/* <video src="/videos/1.mp4" ref={videoEl} onClick={handleLoadedMetadata} height='250px' width='250px'></video> */}

        <div className="wrapper">
          {
            currentPosts.map((data) => (
              <div className="wrap" key={data._id}>
                <div className='p-r'>
                  <video
                    src={data.video.url}
                    muted
                    ref={videoEl}
                    style={{ objectFit: 'cover' }}
                    className='video'
                    onMouseMove={(e) => controlVid(e.target, 'move')}
                    onMouseLeave={(e) => controlVid(e.target, 'leave')}
                    onClick={() => videoRouter(data._id)}
                  ></video>
                  <div className="dur">28:50</div>
                </div>
                <div className='bbtxt'>{data.title}</div>
                <div className='smalltxt'>{data.categories[0].title}</div>
              </div>
            ))
          }
        </div>
        <div className="d-f j-cc">
          <Pagnation
            postsPerPage={postPerPage}
            totalPosts={datas.length}
            paginate={paginate}
            currentPage={currentPage}
            maxPageNumLimit={maxPageNumLimit}
            minPageNumLimit={minPageNumLimit}
            handlePagNext={handlePagNext}
            handlePagPrev={handlePagPrev}
          />
        </div>
      </div>
    </>
  )
}
