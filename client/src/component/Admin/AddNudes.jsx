import React, { useEffect, useState } from 'react'
import AddButton from './component/AddButton'
import ImageComponent from './component/ImageComponent'
import { Btn1 } from '../forms/Button'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../forms/Spinner'

function AddNudes() {
  const [spinner, setSpinner] = useState(true)

  const [categories, setCategories] = useState([])
  const [imgForms, setImgForms] = useState([])

  const errorNotify = () => toast.error("Error: Please check your internet connection")

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get('http://localhost:3001/category')
        setCategories(res.data)
        setSpinner(false)
        // console.log(res.data);
      } catch (err) {
        console.log(err)
        setSpinner(false)
        errorNotify()
      }
    }
    fetchCat()
  }, [])

  const handleAddNude = () => {
    setImgForms([...imgForms,
    {
      id: (+new Date * Math.random()).toString(36).substring(0, 10),
      title: '',
      images: [],
      categories: []
    }
    ])
  }


  const handleRemoveVideoForm = (i) => {
    const form = imgForms.find(res => res.id == i)
    const formIndex = imgForms.findIndex(res => res == form)
    imgForms.splice(formIndex, 1)
    setImgForms([...imgForms])

  }


  const onChange = (e, id) => {
    setImgForms(imgForms.map(form => (
      form.id === id ? { ...form, title: e.target.value } : form
    )
    ))
  }

  const handleBadge = (dataId, category) => {

    const fff = imgForms.find(res => res.id === dataId)
    const index = (imgForms.findIndex(res => res === fff))

    const catCheck = imgForms[index].categories.find(res => res.category._id === category._id);
    const catIndex = imgForms[index].categories.findIndex(res => res === catCheck)

    if (imgForms[index].id === dataId && catCheck === undefined) {
      imgForms[index].categories.push({ category: category })
      setImgForms([...imgForms])
    } else if (imgForms[index].id === dataId && catCheck !== undefined) {
      imgForms[index].categories.splice(catIndex, 1)
      setImgForms([...imgForms])
    }
  }

  const toBase64 = (index, file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        // resolve(reader.result)
        imgForms[index].images.push(reader.result)
        setImgForms([...imgForms])
      };
      reader.onerror = function (error) {
        reject(error)
      };
    })
  }

  const addImages = async (event, dataId) => {

    const fff = imgForms.find(res => res.id === dataId)
    const index = (imgForms.findIndex(res => res === fff))

    const selectedFile = event.target.files
    const selectedFilesArray = Array.from(selectedFile)

    if (imgForms[index].id === dataId) {
      selectedFilesArray.map((file) => {
        imgForms[index].images.push(file)
        setImgForms([...imgForms])
        //  WHAT I DID HERE IS I CONVERTED THE IMAGES INTO BASE64, AND I CREATE A FUNCTION FOR IT CALLED toBase64 WHICH ALSO UPDATE setImgForm
        // toBase64(index, file)
      })
    }
  }

  const handleImgCancel = (dataId, i) => {
    const fff = imgForms.find(res => res.id === dataId)
    const index = (imgForms.findIndex(res => res === fff))

    if (imgForms[index].id === dataId) {
      imgForms[index].images.splice(i, 1)
      setImgForms([...imgForms])
    }
  }


  const handleSubmit = async () => {
    for (let i = 0; i < imgForms.length; i++) {
      for (let j = 0; j < imgForms[i].images.length; j++) {
        const imgData = new FormData()
        imgData.append('file', imgForms[i].images[j])
        imgData.append('upload_preset', 'uploads')

        await axios.post("https://api.cloudinary.com/v1_1/ayomikun/auto/upload", imgData)
          .then(res => {
            imgForms[i].images[j] = res.data.url
            setImgForms([...imgForms])
          })
          .catch((err) => {
            console.log({ message: `Images ${i}, Error saving to cloudinary`, error: err });
          })

      }

      try {
        const response = await axios.post('http://localhost:3001/nude', imgForms[i])
        console.log(response.data);
      } catch (err) {
        console.log({ message: `Data ${i}, Error saving to database(MongoDb)`, error: err });
      }
    }
  }


  if (spinner) {
    return <Spinner />
  }


  return (
    <>
      {
        imgForms.map((data, i) => (
          <ImageComponent
            key={i}
            data={data}
            value={data.title}
            RemoveImageForm={() => handleRemoveVideoForm(data.id)}
            onChange={onChange}
            handleBadge={handleBadge}
            categories={categories}
            addImages={addImages}
            handleImgCancel={handleImgCancel}
          />
        ))
      }
      <div className='d-f j-cs ' style={{ alignItems: 'flex-end' }}>
        <div>
          <AddButton handleAdd={handleAddNude} />
        </div>
        <div>
          <Btn1 handleBtnClick={handleSubmit} text='Submit To Database' style={{ 'backgroundColor': 'green', 'fontSize': '15px' }} />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AddNudes