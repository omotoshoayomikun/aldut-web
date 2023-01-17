import React, { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiUpload } from 'react-icons/bi'
import Badge from '../forms/Badge'
import Input from '../forms/Input'
import Select from '../forms/Select'
import VideoComponent from './component/VideoComponent'
import AddButton from './component/AddButton'
import { Btn1 } from '../forms/Button'
import axios from 'axios'
import { GiCondorEmblem } from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../forms/Spinner'
import { Pre } from '../forms/Modal'

function AddVideos() {

    const [spinner, setSpinner] = useState(true)

    const [videoForms, setVideoForms] = useState([])
    const [categories, setCategories] = useState([])

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

    const handAddVideo = () => {

        // let day = `${new Date().getDay()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}:${new Date().getHours()}:${new Date().getMinutes()}`
        setVideoForms([...videoForms,
        {
            id: (+new Date * Math.random()).toString(36).substring(0, 10),
            // date:  day,
            title: '',
            video: {},
            clip: null,
            categories: []
        }
        ])
        // setVideoForms([...videoForms, ()])
    }

    const handleRemoveVideoForm = (i) => {
        const vid = videoForms.find(res => res.id == i)
        const vidIndex = videoForms.findIndex(res => res == vid)
        videoForms.splice(vidIndex, 1)
        setVideoForms([...videoForms])
    }

    // const [title, setTitle] = useState('')

    const onChange = (e, id) => {
        setVideoForms(videoForms.map(vid => (
            vid.id === id ? { ...vid, title: e } : vid
        )
        ))
    }


    const handleBadge = (dataId, category) => {

        const fff = videoForms.find(res => res.id === dataId)
        const index = (videoForms.findIndex(res => res === fff))

        const catCheck = videoForms[index].categories.find(res => res.category._id === category._id);
        const catIndex = videoForms[index].categories.findIndex(res => res === catCheck)

        if (videoForms[index].id === dataId && catCheck === undefined) {
            videoForms[index].categories.push({ category })
            setVideoForms([...videoForms])
        } else if (videoForms[index].id === dataId && catCheck !== undefined) {
            videoForms[index].categories.splice(catIndex, 1)
            setVideoForms([...videoForms])
        }
    }

    console.log(videoForms);

    // const toBase64 = (index, file, vidOrClip) => {
    //     return new Promise((resolve, reject) => {
    //         let reader = new FileReader()
    //         reader.readAsDataURL(file)
    //         reader.onload = function () {
    //             // resolve(reader.result)
    //             videoForms[index][vidOrClip] = reader.result
    //             setVideoForms([...videoForms])
    //         };
    //         reader.onerror = function (error) {
    //             reject(error)
    //             console.log(error);
    //         };
    //     })
    // }

    const handleUploadVid = (event, dataId) => {
        const fff = videoForms.find(res => res.id === dataId)
        const index = (videoForms.findIndex(res => res === fff))

        const file = event.target.files[0]

        if (videoForms[index].id === dataId) {
            videoForms[index]['video'] = {cloudinary_id: '', url: file}
            setVideoForms([...videoForms])
            //  WHAT I DID HERE IS I CONVERTED THE VIDEO INTO BASE64, AND I CREATE A FUNCTION FOR IT CALLED toBase64 WHICH ALSO UPDATE setVideoForm()
            // toBase64(index, file, 'video')
        }

    }

    const handleUploadClip = (event, dataId) => {
        const fff = videoForms.find(res => res.id === dataId)
        const index = (videoForms.findIndex(res => res === fff))

        const file = event.target.files[0]

        if (videoForms[index].id === dataId) {
            videoForms[index]['clip'] = file
            setVideoForms([...videoForms])
            //  WHAT I DID HERE IS I CONVERTED THE VIDEO INTO BASE64, AND I CREATE A FUNCTION FOR IT CALLED toBase64 WHICH ALSO UPDATE setVideoForm()
            // toBase64(index, file, 'video')
        }
    }


    const handleSubmit = async () => {

        for (let i = 0; i < videoForms.length; i++) {
            const fileVideo = videoForms[i].video.url

            const data = new FormData()
            data.append('file', fileVideo)
            data.append('upload_preset', 'video_uploads')



            await axios.post("https://api.cloudinary.com/v1_1/ayomikun/auto/upload", data)
                .then(res => {
                    videoForms[i].video = {cloudinary_id: res.data.public_id, url: res.data.url}
                    setVideoForms([...videoForms])

                    try {
                        const response = axios.post('http://localhost:3001/video', videoForms[i])
                        console.log(response.data);
                    } catch (err) {
                        console.log({ message: `Data ${i}, Error saving to database(MongoDb)`, error: err })
                    }

                })
                .catch((err) => {
                    console.log({ message: `Data ${i}, Error saving to cloudinary`, error: err })
                })
        }

        // const fileImg = videoForms[0].video
        // const data = new FormData()
        // data.append('file', fileImg)
        // data.append('upload_preset', 'video_uploads')

        // try {
        //     const response = await axios.post('http://localhost:3001/video', videoForms)
        //     console.log(response.data)

        //     //     const data = await axios.post('http://localhost:3001/video',)
        //     //    const res = await axios.post("https://api.cloudinary.com/v1_1/ayomikun/video/upload", data)
        //     //    console.log(await res.data)
        // } catch (err) {
        //     console.log(err);
        // }
    }

    console.log(videoForms);


    if (spinner) {
        return <Spinner />
    }

    return (
        <>
            {
                videoForms.map((data, i) => (
                    <VideoComponent
                        key={i}
                        data={data}
                        value={data.title}
                        RemoveVideoForm={() => handleRemoveVideoForm(data.id)}
                        onChange={onChange}
                        handleBadge={handleBadge}
                        categories={categories}
                        handleUploadVid={handleUploadVid}
                        handleUploadClip={handleUploadClip}
                    />
                ))
            }
            <div className='d-f j-cs ' style={{ alignItems: 'flex-end' }}>
                <div>
                    <AddButton handleAdd={handAddVideo} />
                </div>
                <div>
                    <Btn1 handleBtnClick={handleSubmit} text='Submit To Database' style={{ 'backgroundColor': 'green', 'fontSize': '15px' }} />
                </div>
            </div>
            {/* <Pre /> */}
            <ToastContainer />
        </>
    )
}

export default AddVideos