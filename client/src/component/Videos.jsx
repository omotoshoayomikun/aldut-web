import React from 'react'
import { useNavigate } from 'react-router-dom/dist'
import '../styles/Videos.css'
import { Btn1, BtnWithIcon } from './forms/Button'
import { IoIosShareAlt } from 'react-icons/io'
import { TiDownload } from 'react-icons/ti'
import { BsThreeDots } from 'react-icons/bs'
import VideoCategory from './Video/VideoCategory'
import RecommendedVid from './Video/RecommendedVid'
import Comments from './Video/Comments'
import { datas } from '../Logic/datas/ListOfVideos'

const Videos = () => {

  const navigate = useNavigate()

  // const datas = [
  //   {
  //     video: '/videos/1.mp4',
  //     title: 'Married Woman Slept Off In Lovers House',
  //     category: 'LEAK VIDEO'
  //   },
  //   {
  //     video: '/videos/word.mp4',
  //     title: 'Married Woman Slept Off In Lovers House',
  //     category: 'LEAK VIDEO'
  //   },
  //   {
  //     video: '/videos/word.mp4',
  //     title: 'Married Woman Slept Off In Lovers House',
  //     category: 'LEAK VIDEO'
  //   },
  //   {
  //     video: '/videos/1.mp4',
  //     title: 'Married Woman Slept Off In Lovers House',
  //     category: 'LEAK VIDEO'
  //   },
  //   {
  //     video: '/videos/word.mp4',
  //     title: 'Married Woman Slept Off In Lovers House',
  //     category: 'LEAK VIDEO'
  //   },
  //   {
  //     video: '/videos/word.mp4',
  //     title: 'Married Woman Slept Off In Lovers House',
  //     category: 'LEAK VIDEO'
  //   },
  // ]

  // const vidDetails = [
  //   {
  //     video: '/videos/1.mp4',
  //     title: 'FIRST ANAL SEX WITH STEPBROTHER'
  //   },
  //   {
  //     video: '/videos/1.mp4',
  //     title: 'FIRST ANAL SEX WITH STEPBROTHER'
  //   },
  //   {
  //     video: '/videos/1.mp4',
  //     title: 'FIRST ANAL SEX WITH STEPBROTHER'
  //   },
  //   {
  //     video: '/videos/1.mp4',
  //     title: 'FIRST ANAL SEX WITH STEPBROTHER'
  //   },
  // ]
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

  return (
    <div className='container'>
      <div className="vidDis">

        <div className="side1">
          <video
            src='/videos/1.mp4'
            controls
            style={{ objectFit: 'cover' }}
            className='vid'
          >
          </video>
          <div className="plgr j-cs a-i">
            <h3 className='mt-1 mb-1' style={{ textTransform: 'uppercase' }}>FIRST ANAL SEX WITH STEPBROTHER</h3>
            <div className='d-f' style={{ gap: '10px' }}>
              <BtnWithIcon icon={<IoIosShareAlt size='20px' />} text='Share' />
              <BtnWithIcon icon={<TiDownload size='20px' style={{ margin: '0px' }} />} text='Download' />
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
            <VideoCategory vidDetails={datas} controlVid={controlVid} title='Top Rated Porn' />
          </div>
          <div>
            <VideoCategory vidDetails={datas} controlVid={controlVid} title='New Porn Video' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videos
