import React from 'react'
import { Btn1 } from '../forms/Button'
import { useState } from 'react'
import { Input } from '../forms/Input'
import { Badge } from '../forms/Badge'
import { GiCheckMark } from 'react-icons/gi'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ErrorModal, Pre, SuccessModal } from '../forms/Modal'
import { Spinner } from '../forms/Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { baseUrl } from '../utils/url'

function UpdateVideo({ setDisplay, dataId }) {

  const navigate = useNavigate()
  const [spinner, setSpinner] = useState(true)

  const [data, setData] = useState({})
  // const [selectedVideo, setSelectedVideo] = useState('')
  const [categories, setCategories] = useState([])
  const [deleteDis, setDeleteDis] = useState(false)
  const [succDis, setSuccDis] = useState(false)
  const [pro_load, setPro_load] = useState({
    show: false,
    total: 0,
    toUpload: 0,
    uploaded: 0
  })


  const errorNotify = (message) => toast.error(message)


  useEffect(() => {

    const fetchCat = async () => {
      try {
        const res = await axios.get(`${baseUrl}/category`)
        setCategories(res.data)
      } catch (err) {
        errorNotify("Error: Please check your internet connection and reload")
        console.log(err)
      }
    }
    fetchCat()

    const fetchData = async () => {
      setSpinner(true)
      try {
        const res = await axios.get(`${baseUrl}/video/${dataId}`)
        setData(res.data)
        // setSelectedVideo(res.data?.video.url)
        setSpinner(false)
      } catch (err) {
        setSpinner(false)
        errorNotify("Error: Please check your internet connection and reload")
        console.log(err)
      }
    }
    fetchData()
  }, [])


  const onChange = (e) => {
    setData({ ...data, title: e.target.value })
  }

  const handleBadge = (cat) => {

    const catCheck = data.categories.find(res => res._id === cat._id);
    const catIndex = data.categories.findIndex(res => res === catCheck)

    if (catCheck === undefined) {
      data.categories.push(cat)
      setData({ ...data })
    } else if (catCheck !== undefined) {
      data.categories.splice(catIndex, 1)
      setData({ ...data })
    }
  }

  console.log(data)

  const handleChangeVid = (e) => {
    // IF AM GOING TO BE USING CLOUDINARY I WILL JUST ADD THE LINK AM GETTING BACK FROM THE API TO THE video IN setData
    // setData({ ...data, video: [e.target.files[0]] })
    const video = e.target.files[0]
    setData({ ...data, video: video })
    // setSelectedVideo(video)
    // const disImage = URL.createObjectURL(image)
    // console.log(video);
  }

  const displayImage = (file) => {
    return URL.createObjectURL(file)
  }


  const handleUpdate = async () => {
    setPro_load({ ...pro_load, show: true, total: 1, uploaded: 0, toUpload: 0 })

    const formData = new FormData()
    formData.append('title', data.title)
    !data.video.url && formData.append('video', data.video)
    formData.append('categories', JSON.stringify(data.categories))

    try {
      const response = await axios({
        url: `${baseUrl}/video/${dataId}`,
        method: 'put',
        data: formData
      })

      setPro_load({ ...pro_load, uploaded: pro_load.uploaded + 1, toUpload: pro_load.total - pro_load.uploaded, })
        setSuccDis(true)

    } catch (err) {
      console.log(err);
      setPro_load({ ...pro_load, show: false, uploaded: 0, toUpload: 0, })
      errorNotify("Error: Please check your internet connection and reload")
    }

  }

  const handleModelOk = () => {
    navigate('/admin/managevideo')
  }

  if (spinner) {
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
              <video src={data.video.name ? displayImage(data.video) : data.video.url} className='nnvid' height='410px' style={{ objectFit: 'cover', width: '100%', borderRadius: '9px' }} controls></video>
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
                      select={data.categories.find((res) => (res._id === category._id)) ? "true" : "false"}
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
          <SuccessModal text='Data updated successfully' handleOk={handleModelOk} />
        )
      }
      <ToastContainer />

      {
        pro_load.show && <Pre data={pro_load} />
      }
    </>
  )
}

export default UpdateVideo