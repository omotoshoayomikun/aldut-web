import React, { useState } from 'react'
import { Btn1 } from '../forms/Button'
import { Badge } from '../forms/Badge'
import { Input } from '../forms/Input'
import { GiCheckMark } from 'react-icons/gi'
import { MdCancel } from 'react-icons/md'
import { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../forms/Spinner'

function UpdateNude({ setDisplay, dataId }) {

    const [spinner, setSpinner] = useState(true)

    const [categories, setCategories] = useState([])
    const [data, setData] = useState({})

    const errorNotify = (message) => toast.error(message)

    useEffect(() => {

        const fetchCat = async () => {
            try {
                const res = await axios.get('http://localhost:3001/category')
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
                const res = await axios.get(`http://localhost:3001/nude/${dataId}`)
                setData(res.data)
                setSpinner(false)
                //   setSelectedVideo(res.data?.video)
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

    const displayImage = (file) => {
        return URL.createObjectURL(file)
    }
    const handleAddImages = (e) => {
        const selectedFile = e.target.files
        const selectedFilesArray = Array.from(selectedFile)
        selectedFilesArray.map(file => {
            data.images.push(file)
            setData({ ...data })
        })
        // setData({ ...data })
    }

    const handleImgCancel = (index) => {
        data.images.splice(index, 1)
        setData({ ...data })
    }

    const handleUpdate = () => {

    }


    if (spinner) {
        return <Spinner />
    }

    return (
        <>
            <div className="modalCont" style={{ zIndex: '1000' }}>
                <div className='modalWrap' onClick={() => setDisplay(false)}></div>
                <div className="con__" style={{ height: '451px', }}>
                    <h3 className='mt-0'>Update Nude</h3>
                    <div className="d-f gap2">
                        <div className="flex2" style={{ overflowX: 'hidden' }}>
                            <div className='p-r'>
                                <div>
                                    <img src={data.images[0].name ? displayImage(data.images[0]) : data.images[0].url} alt="" style={{ width: '100%', height: '290px', borderRadius: '9px' }} />
                                </div>
                                <div className='p-a' style={{ top: '10px', right: '10px', }} onClick={() => handleImgCancel(0)} >
                                    <MdCancel size='25px' cursor='pointer' color='tomato' style={{ boxShadow: '0px 0px 4px #000', backgroundColor: 'white' }} />
                                </div>
                            </div>
                            <div className='d-f mt-1 gap1 mzaa ' style={{}}>
                                {
                                    data.images.map((image, i) => (
                                        <div key={i} className='p-r'>
                                            <div>
                                                <img src={image.name ? displayImage(image) : image.url} alt="" style={{ width: '90px', height: '70px', borderRadius: '9px' }} />
                                            </div>
                                            <div className='p-a' style={{ top: '5px', right: '5px', }} onClick={() => handleImgCancel(i)}>
                                                <MdCancel size='15px'
                                                    cursor='pointer' color='tomato'
                                                    style={{
                                                        boxShadow: '0px 0px 4px #000',
                                                        margin: '0px', backgroundColor: 'white'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )).slice(1, data.images.length)
                                }
                            </div>
                            <div className="d-f j-cs">
                                <div>
                                    <Btn1 text='Add Nude' />
                                    <input className='p-a maqz'
                                        type="file" style={{ transform: 'scale(2,2)', opacity: '0', cursor: 'pointer' }}
                                        multiple
                                        accept='image/png, image/jpeg, image/webp' onChange={(e) => handleAddImages(e)}
                                    />
                                </div>
                                <Btn1 text='Update to database' style={{ 'backgroundColor': 'green' }} handleBtnClick={handleUpdate} />
                            </div>
                        </div>
                        <div className="flex1-5">
                            <h3 className='mt-0 mb-1'>Title</h3> <hr />
                            <Input style={{ 'width': '95%' }} value={data.title} onChange={(e) => onChange(e)} />
                            <h3 className='mt-2 mb-1'>Categories</h3> <hr />
                            <div className="d-f" style={{ flexWrap: 'wrap', height: '280px', overflowY: 'scroll' }}>
                                {
                                    categories.map(category => (
                                        <Badge
                                            key={category._id}
                                            category={category.title} style={{ 'margin': '5px' }}
                                            select={data.categories.find((res) => (res._id === category._id)) ? "true" : "false"}
                                            handleClick={() => handleBadge(category)}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default UpdateNude