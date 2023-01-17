import React from 'react'
import { Btn1 } from '../forms/Button'
import { useState } from 'react'
import { Input } from '../forms/Input'
import { Badge } from '../forms/Badge'
import { GiCheckMark } from 'react-icons/gi'
import { useEffect } from 'react'
import axios from 'axios'
import { ErrorModal, SuccessModal } from '../forms/Modal'
import { Spinner } from '../forms/Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function UpdateVideo({ setDisplay, dataId }) {
  
  const [spinner, setSpinner] = useState(true)

  const [data, setData] = useState({})
  const [selectedVideo, setSelectedVideo] = useState('')
  const [categories, setCategories] = useState([])
  const [deleteDis, setDeleteDis] = useState(false)
  const [succDis, setSuccDis] = useState(false)

  
  const errorNotify = () => toast.error("Error: Please check your internet connection")


  useEffect(() => {

    const fetchCat = async () => {
      try {
        const res = await axios.get('http://localhost:3001/category')
        setCategories(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCat()

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/video/${dataId}`)
        setData(res.data)
        setSelectedVideo(res.data?.video)
        setSpinner(false)
      } catch (err) {
        setSpinner(false)
        errorNotify()
        console.log(err)
      }
    }
    fetchData()
  }, [])


  const onChange = (e) => {
    setData({ ...data, title: e.target.value })
  }

  const handleBadge = (cat) => {

    const catCheck = data.categories.find(res => res.category._id === cat._id);
    const catIndex = data.categories.findIndex(res => res === catCheck)

    if (catCheck === undefined) {
      data.categories.push({ category: cat })
      setData({ ...data })
    } else if (catCheck !== undefined) {
      data.categories.splice(catIndex, 1)
      setData({ ...data })
    }
  }

  const handleChangeVid = (e) => {
    // IF AM GOING TO BE USING CLOUDINARY I WILL JUST ADD THE LINK AM GETTING BACK FROM THE API TO THE video IN setData
    // setData({ ...data, video: [e.target.files[0]] })
    const image = e.target.files[0]
    setSelectedVideo(image)
    // const disImage = URL.createObjectURL(image)
    console.log(image);
    // console.log(disImage);
  }

  const displayImage = (file) => {
    return URL.createObjectURL(file)
  }


  const handleUpdate = async () => {
    // const response = await axios.post()
    //   .then(res => {
    //     try {
    //       const res = axios.post(`http://localhost:3001/video/${dataId}`, data)
    //       console.log(res);
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   })

  }

  if(spinner) {
    return <Spinner />
  }

  return (
    <>
      <div className="modalCont">
        <div className='modalWrap' onClick={() => setDisplay(false)}></div>
        <div className="con__">
          <h3 className='mt-0'>Update Video</h3>
          <div className="d-f" style={{ gap: '20px' }}>
            <div className="flex2">
              <video src={selectedVideo.name ? displayImage(selectedVideo) : selectedVideo} className='nnvid' height='410px' style={{ objectFit: 'cover', width: '100%', borderRadius: '9px' }} controls></video>
              <div className="d-f j-cs">
                <button className="btn2 mt-1 p-r" style={{ overflow: 'hidden', backgroundColor: 'tomato' }}>
                  Change Video
                  <input className='p-a maqz' type="file" style={{ transform: 'scale(2,2)', opacity: '0', cursor: 'pointer' }} accept='.mp4, .mkv' onChange={(e) => handleChangeVid(e)} />
                </button>
                <button className="btn2 mt-1 p-r" style={{ overflow: 'hidden' }} onClick={handleUpdate}>
                  Update to database
                </button>
              </div>
            </div>
            <div className="flex1-5">
              <h3 className='mt-0 mb-1'>Title</h3> <hr />
              <Input style={{ 'width': '95%' }} value={data.title} onChange={(e) => onChange(e)} />
              <h3 className='mt-2 mb-1'>Categories</h3> <hr />
              <div className="d-f" style={{ flexWrap: 'wrap', height: '280px', overflowY: 'scroll' }}>
                {
                  categories.map((category) => (
                    <Badge key={category._id}
                      category={category.title} style={{ 'margin': '5px' }}
                      select={data.categories.find((res) => (res.category._id === category._id)) ? "true" : "false"}
                      handleClick={() => handleBadge(category)} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        deleteDis && (
          <ErrorModal text='Are you sure, you want to delete this Nude' setDisplay={setDeleteDis} />
        )
      }
      {
        succDis && (
          <SuccessModal text='Nude updated successfully' setDisplay={setSuccDis} />
        )
      }
      <ToastContainer />
    </>
  )
}

export default UpdateVideo