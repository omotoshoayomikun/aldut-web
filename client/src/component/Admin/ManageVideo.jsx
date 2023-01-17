import React, { useState } from 'react'
import { FcCancel } from 'react-icons/fc'
import { MdEdit } from 'react-icons/md'
import { ErrorModal, SuccessModal } from '../forms/Modal'
import UpdateVideo from './UpdateVideo'
import { useEffect } from 'react'
import axios from 'axios'
import { Spinner } from '../forms/Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ManageVideo() {

  const [spinner, setSpinner] = useState(true)

  const [editDis, setEditDis] = useState(false)
  const [deleteDis, setDeleteDis] = useState(false)
  const [succDis, setSuccDis] = useState(false)
  const [datas, setDatas] = useState([])
  const [singleData, setSingleData] = useState('')

  const errorNotify = () => toast.error("Error: Please check your internet connection and reload")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/video')
        setDatas(res.data)
        setSpinner(false)
      } catch (err) {
        setSpinner(false)
        errorNotify()
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const handleDelete = () => {
    setDeleteDis(true)
  }

  const handleEdit = (dataId) => {
    // console.log(dataId)
    setEditDis(true)
    setSingleData(dataId)
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
                  <video src={data.video} className='admVideo'></video>
                </td>
                <td>
                  {
                    data.categories.map((vidCat, i) => (
                      <small key={vidCat.category._id}>{vidCat.category.title}, </small>
                    )).slice(0, 3).concat('...')
                  }
                </td>
                <td>
                  <div className="d-f" style={{}}>
                    <div onClick={handleDelete} style={{ cursor: 'pointer' }} className='mr-5'><FcCancel size='25px' className='cursor' /></div>
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

export default ManageVideo