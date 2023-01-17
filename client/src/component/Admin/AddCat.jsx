import React, { useState } from 'react'
import { Input, InputWithKeyPress, MaterializeInput } from '../forms/Input'
import { Btn1 } from '../forms/Button'
import { BadgeWithIcon } from '../forms/Badge'
import { FcCancel } from 'react-icons/fc'
import { MdEdit } from 'react-icons/md'
import UpdateCat from './UpdateCat'
import { ErrorModal, SuccessModal } from '../forms/Modal'
import axios from 'axios'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../forms/Spinner'

function AddCat() {

  const [spinner, setSpinner] = useState(true)

  const [categories, setCategories] = useState([])
  const [catLists, setCatLists] = useState([])
  const [updateDis, setUpdateDis] = useState(false)
  const [deleteDis, setDeleteDis] = useState(false)
  const [succDis, setSuccDis] = useState(false)
  const [succAddDis, setSuccAddDis] = useState(false)

  const [catId, setCatId] = useState('')


  const errorNotify = () => toast.error("Error: Please check your internet connection and reload")

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get('http://localhost:3001/category')
        setCatLists(res.data)
        setSpinner(false)
      } catch (err) {
        setSpinner(false)
        errorNotify()
        console.log(err)
      }
    }
    fetchCat()
  }, [])


  const handleDeleteCat = (catId) => {
    setCatId(catId)
    setDeleteDis(true)
  }

  const handleDeleteCategory = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/category/${catId}`)

    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (catId) => {
    setCatId(catId)
    setUpdateDis(true)
  }


  const [catInput, setCatInput] = useState('')

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      categories.push({ id: (+new Date * Math.random()).toString(36).substring(0, 10), title: catInput })
      setCategories([...categories])
      setCatInput('')
    }
  }


  const handleCancelCat = (i) => {
    categories.splice(i, 1)
    setCategories([...categories])
  }

  const handleAddCat = async () => {
    try {
      const res = await axios.post('http://localhost:3001/category', categories)
      console.log(res.data);
    } catch (err) {
      console.log(err)
    }
  }


  if (spinner) {
    return <Spinner />
  }


  return (
    <>
      <div className="mt-5 mb-5">
        <div className="d-f" style={{ gap: '40px' }}>
          <div className="flex2" >
            <InputWithKeyPress label='Add Category' style={{ 'width': '100%' }} value={catInput} setValue={setCatInput} handleEnter={handleEnter} />
            <small style={{ color: 'grey' }}>Please press enter to add multiple category</small>
            <div className='d-f' style={{ flexWrap: 'wrap' }}>
              {
                categories.map((category, i) => (
                  <BadgeWithIcon key={i} category={category} style={{ margin: '10px 10px' }} icon='X' handleCancelCat={() => handleCancelCat(i)} />
                ))
              }
            </div>
            <div className="mt-4">
              <h3>Category List</h3> <hr className='mb-4' />
              <table className='cusTable'>
                <thead className='cusTaHead'>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='cusTbody'>
                  {
                    catLists.map((cat, i) => (
                      <tr key={cat._id}>
                        <td>{cat._id.slice(0, 6).concat('...')}</td>
                        <td></td>
                        <td>{cat.title}</td>
                        <td>
                          <div className="d-f" style={{}}>
                            <div onClick={() => handleDeleteCat(cat._id)} style={{ cursor: 'pointer' }} className='mr-5'><FcCancel size='25px' className='cursor' /></div>
                            <div onClick={() => handleEdit(cat._id)} style={{ cursor: 'pointer' }}><MdEdit size='25px' color='green' /></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex1">
            <Btn1 text='ADD' style={{ 'fontSize': '15px', 'backgroundColor': 'green' }} handleBtnClick={handleAddCat} />
          </div>
        </div>
      </div>
      {
        updateDis && (
          <UpdateCat setDisplay={setUpdateDis} catId={catId} />
        )
      }
      {
        deleteDis && (
          <ErrorModal text='Are you sure, you want to delete this Category' dataId={catId} handleErrYes={handleDeleteCategory} setDisplay={setDeleteDis} />
        )
      }
      {
        succDis && (
          <SuccessModal text='Category updated successfully' setDisplay={setSuccDis} />
        )
      }
      {
        succAddDis && (
          <SuccessModal text='Category added successfully' setDisplay={setSuccAddDis} />
        )
      }
      <ToastContainer />
    </>
  )
}

export default AddCat
