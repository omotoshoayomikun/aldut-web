import React, { useState } from 'react'
import { FcCancel } from 'react-icons/fc'
import { MdEdit } from 'react-icons/md'
import { ErrorModal } from '../forms/Modal'
import UpdateVideo from './UpdateVideo'
import { useEffect } from 'react'
import axios from 'axios'
import { Spinner } from '../forms/Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { baseUrl } from '../utils/url'

function ManageVideo() {

  const [spinner, setSpinner] = useState(true)

  const [editDis, setEditDis] = useState(false)
  const [deleteDis, setDeleteDis] = useState(false)
  const [datas, setDatas] = useState([])
  const [singleData, setSingleData] = useState('')

  const errorNotify = (message) => toast.error(message)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/video`)
        setDatas(res.data)
        setSpinner(false)
      } catch (err) {
        setSpinner(false)
        errorNotify("Error: Please check your internet connection and reload")
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const handleDelete = (dataId) => {
    // NOTE I ONLY NEEDED THE dataId ANDE THE DISPLAY ERR TRUE SO I CAN ACCESS THE dataId WHEN I NEEDED IT TO DELETE IN handleErrYes FUNCTION
    setSingleData(dataId)
    setDeleteDis(true)


  }

  const handleErrYes = async() => {
    try {
      const res = await axios.delete(`${baseUrl}/video/${singleData}`)
      console.log(res)
      setDeleteDis(false)
     setDatas(datas.filter(data => data._id !== singleData))
    } catch (err) {
      errorNotify("Error: Please check your internet connection and reload")
      console.log(err);
    }
  }

  const handleEdit = (dataId) => {
    // console.log(dataId)
    setSingleData(dataId)
    setEditDis(true)
  }

  if (spinner) {
    return <Spinner />
  }

  return (
    <>
      <table className='cusTable'>
        <thead className='cusTaHead'>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Title</th>
            <th>Video</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='cusTbody'>
          {
            datas.map((data) => (
              <tr key={data._id}>
                <td>{data._id.slice(0, 6).concat('...')}</td>
                <td></td>
                <td>{data.title}</td>
                <td className='p-r'>
                  <video src={data.video.url} className='admVideo'></video>
                </td>
                <td>
                  {
                    data.categories.map((vidCat, i) => (
                      <small key={vidCat._id}>{vidCat.title}, </small>
                    )).slice(0, 3).concat('...')
                  }
                </td>
                <td>
                  <div className="d-f" style={{}}>
                    <div onClick={() => handleDelete(data._id)} style={{ cursor: 'pointer' }} className='mr-5'><FcCancel size='25px' className='cursor' /></div>
                    <div onClick={() => handleEdit(data._id)} style={{ cursor: 'pointer' }}><MdEdit size='25px' color='green' /></div>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        editDis && (
          <UpdateVideo setDisplay={setEditDis} dataId={singleData} />
        )
      }
      {
        deleteDis && (
          <ErrorModal text='Are you sure, you want to delete this Nude' setDisplay={setDeleteDis} handleErrYes={handleErrYes} />
        )
      }
      {/* {
        succDis && (
          <SuccessModal text='Nude updated successfully' setDisplay={setSuccDis} />
        )
      } */}
      <ToastContainer />
    </>
  )
}

export default ManageVideo
