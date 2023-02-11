import React from 'react'
import { useNavigate, useParams } from 'react-router-dom/dist'
import '../styles/Videos.css'
import { BtnWithIcon } from './forms/Button'
import { IoIosShareAlt } from 'react-icons/io'
import { TiDownload } from 'react-icons/ti'
import { BsThreeDots } from 'react-icons/bs'
import VideoCategory from './Video/VideoCategory'
import RecommendedVid from './Video/RecommendedVid'
import Comments from './Video/Comments'
import { datas } from '../Logic/datas/ListOfVideos'
import Share from './Video/Share'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { SpinnerText } from './forms/Spinner'
import { baseUrl } from './utils/url'

const Videos = () => {

  const { videoId } = useParams()

  const [share, setShare] = useState({ show: false, url: window.location.href })
  const [video, setVideo] = useState({})
  const [spinner, setSpinner] = useState({ video: true, categories: true })
  const [page404, setPage404] = useState(false)

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/video/${videoId}`)
        setVideo(response.data)
        setSpinner({ ...spinner, video: false })
      } catch (err) {
        setSpinner({ ...spinner, video: false })
        setPage404(true)
        console.log(err)
      }
    }
    getVideo()
  }, [])

  // console.log(vid);

  const navigate = useNavigate()

  const handleShare = () => {
    setShare({ ...share, show: true, url: window.location.href })
  }

  const controlVid = (e, sort) => {
    sort === 'move' ? e.play() : e.pause()
    // console.log(parseInt(e.duration /60, 10))
    // console.log(parseInt(e.duration))
    // console.log(parseInt(e.duration % 60))
    // console.log(parseInt(e.duration / 60))
  }

  const badges = [
    'kissing', 'real orgasm', 'stepbrother and stepsister', 'slim ebony', 'lightskin ebony', 'kissing', 'real orgasm', 'stepbrother and stepsister', 'slim ebony', 'lightskin ebony'
  ]

  const videoRouter = (params) => {
    navigate(`video/${params}`)
  }

  const downloadVideo = (url) => {
    console.log(url)
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]))
        const aTag = document.createElement('a')
        aTag.href = blobUrl;
        const filename = url.split('/').pop()
        aTag.setAttribute("download", filename)
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
      })

  }

  if (page404) {
    return (
      <>
        <div className="d-f j-cc a-i" style={{height: 'calc(100vh - 63px)'}}>
          No internet please <a href={window.location.href} style={{color: 'blue', margin: '0px 5px'}}> reload </a> the page
        </div>
      </>
    )
  }

  return (
    <>
      <div className='container'>
        <div className="vidDis">

          <div className="side1">
            {
              spinner.video ? <div className='vid d-f j-cc a-i'>
                <SpinnerText text='Loading ' />
              </div> :
                (
                  <video
                    src={video.video.url}
                    controls
                    style={{ objectFit: 'cover' }}
                    className='vid'
                  >
                  </video>
                )
            }
            <div className="plgr j-cs a-i">
              <h3 className='mt-1 mb-1' style={{ textTransform: 'uppercase' }}>{video.title}</h3>
              <div className='d-f' style={{ gap: '10px' }}>
                <BtnWithIcon icon={<IoIosShareAlt size='20px' />} text='Share' handleBtnClick={handleShare} />
                <BtnWithIcon icon={<TiDownload size='20px' style={{ margin: '0px' }} />} text='Download' handleBtnClick={() => downloadVideo(video.video.url)} />
                <BtnWithIcon icon={<BsThreeDots size='20px' style={{ margin: '0px' }} />} />
              </div>
            </div>
            {/* <div className='smalltxt'>{data.category}</div> */}
            <div>
              <Comments />
            </div>

            <div className="ttt mb-3 mt-3" style={{ fontSize: '20px', }}>Recommended Porn</div>
            <RecommendedVid datas={datas} controlVid={controlVid} videoRouter={videoRouter} />

            <div className="ttt mt-3" style={{ fontSize: '20px', }}>Categories</div>
            <div className='d-f mt-2 mb-4' style={{ width: '100%', flexWrap: 'wrap' }}>
              {
                badges.map((badge, i) => (
                  <div className="badge" style={{ margin: '8px 10px' }} key={i} >
                    {badge}
                  </div>
                ))
              }
            </div>
            <div className="p-r">
              <hr />
              <div className='moreVV'>VIEW MORE</div>
            </div>
          </div>

          <div className="side2">
            <div>
              <VideoCategory vidDetails={datas} controlVid={controlVid} title='Top Rated Porn' reference='top' />
            </div>
            <div>
              <VideoCategory vidDetails={datas} controlVid={controlVid} title='New Porn Video' reference='new' />
            </div>
          </div>
        </div>
      </div>
      {
        share.show && <Share url={share.url} setShare={setShare} />
      }
    </>
  )
}

export default Videos
