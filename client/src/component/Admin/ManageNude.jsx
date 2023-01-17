import React, { useState } from 'react'
import { FcCancel } from 'react-icons/fc'
import { MdEdit } from 'react-icons/md'
import UpdateVideo from './UpdateVideo'
import { ErrorModal, SuccessModal } from '../forms/Modal'
import UpdateNude from './UpdateNude'
import { GiPhotoCamera } from 'react-icons/gi'
import { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../forms/Spinner'

function ManageNude() {

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
        const res = await axios.get('http://localhost:3001/nude')
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
    setEditDis(true)
    setSingleData(dataId)
  }

  const handleUpdate = () => {
    setEditDis(false)
    setSuccDis(true)
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
            <th>Nudes</th>
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
                <td className=''>
                  <div className='p-r' style={{ width: '70px', height: '70px', }}>
                    <img src={data.images[0]} className='' style={{ width: '70px', height: '70px', borderRadius: '50%', }} />
                    <div className="dur p-a d-f j-cc a-i" style={{ margin: 'auto', left: '0px', right: '0px', top: '0px', bottom: '0px', height: '10px', }}>+{data.images.length - 1}</div>
                    {/* {
                      data.images.map((img, i) => (
                        <img key={i} src={img}  className='admVideo mr-1' />
                      ))
                    } */}
                    {/* <div className='p-a fs-2 d-f j-c a-i' style={{ width: '100%'}}>
                      <div>4</div>
                    </div> */}
                  </div>
                </td>
                <td>
                  {data.categories.map((nudeCat, i) => (
                    <small key={nudeCat.category._id}>{nudeCat.category.title}, </small>
                  ))}
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
          <UpdateNude setDisplay={setEditDis} dataId={singleData} />
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

export default ManageNude
