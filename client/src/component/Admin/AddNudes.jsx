import React, { useEffect, useState } from 'react'
import AddButton from './component/AddButton'
import ImageComponent from './component/ImageComponent'
import { Btn1 } from '../forms/Button'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../forms/Spinner'
import { Pre } from '../forms/Modal'

function AddNudes() {
  const [spinner, setSpinner] = useState(true)

  const [categories, setCategories] = useState([])
  const [imgForms, setImgForms] = useState([])
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
        const res = await axios.get('http://localhost:3001/category')
        setCategories(res.data)
        setSpinner(false)
        // console.log(res.data);
      } catch (err) {
        console.log(err)
        setSpinner(false)
        errorNotify("Error: Please check your internet connection")
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
      categories: [],
      error: {
        title: false,
        images: false,
        categories: false,
      }
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

    const catCheck = imgForms[index].categories.find(res => res._id === category._id);
    const catIndex = imgForms[index].categories.findIndex(res => res === catCheck)

    if (imgForms[index].id === dataId && catCheck === undefined) {
      imgForms[index].categories.push(category)
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

    // ERROR HANDLING 
    for (let i = 0; i < imgForms.length; i++) {
      imgForms[i].title === '' ? imgForms[i].error.title = true : imgForms[i].error.title = false
      setImgForms([...imgForms])
      imgForms[i].images.length < 1 ? imgForms[i].error.images = true : imgForms[i].error.images = false
      setImgForms([...imgForms])
      imgForms[i].categories.length < 1 ? imgForms[i].error.categories = true : imgForms[i].error.categories = false
      setImgForms([...imgForms])

    }


    // COMFIRMATION THAT THERE IS NO ERROR 
    let confirm = true

    for (let j = 0; j < imgForms.length; j++) {
      if (imgForms[j].error.title === true || imgForms[j].error.categories === true || imgForms[j].error.images === true) {
        confirm = false
        errorNotify("Please make sure all data are inputed in")
        break
      }

    }

    // SERVER SIDE LOGIC

    if (confirm) {

      for (let i = 0; i < imgForms.length; i++) {
        setPro_load({ ...pro_load, show: true, total: imgForms.length, uploaded: i, toUpload: imgForms.length - i })

        const data = new FormData()
        data.append('title', imgForms[i].title)
        for (const single_file of imgForms[i].images) {
          data.append('images', single_file)
        }
        data.append('categories', JSON.stringify(imgForms[i].categories))

        try {
          const response = await axios({
            method: 'post',
            url: "http://localhost:3001/nude",
            data: data,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          setPro_load({ ...pro_load, uploaded: pro_load.uploaded + 1, toUpload: pro_load.total - pro_load.uploaded, })
        } catch (err) {
          setPro_load({ ...pro_load, show: false, uploaded: 0, toUpload: 0, })
          errorNotify("Error: Please check your internet connection")
          console.log(err);
        }

      }
    }


    // for (let i = 0; i < imgForms.length; i++) {
    //   for (let j = 0; j < imgForms[i].images.length; j++) {
    //     const imgData = new FormData()
    //     imgData.append('file', imgForms[i].images[j])
    //     imgData.append('upload_preset', 'uploads')

    //     await axios.post("https://api.cloudinary.com/v1_1/ayomikun/auto/upload", imgData)
    //       .then(res => {
    //         imgForms[i].images[j] = res.data.url
    //         setImgForms([...imgForms])
    //       })
    //       .catch((err) => {
    //         console.log({ message: `Images ${i}, Error saving to cloudinary`, error: err });
    //       })

    //   }

    //   try {
    //     const response = await axios.post('http://localhost:3001/nude', imgForms[i])
    //     console.log(response.data);
    //   } catch (err) {
    //     console.log({ message: `Data ${i}, Error saving to database(MongoDb)`, error: err });
    //   }
    // }
  }

  console.log(imgForms)


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
      {
        pro_load.show && <Pre data={pro_load} />
      }
    </>
  )
}

export default AddNudes