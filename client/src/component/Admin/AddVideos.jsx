import React, { useEffect } from 'react'
import { useState } from 'react'
import VideoComponent from './component/VideoComponent'
import AddButton from './component/AddButton'
import { Btn1 } from '../forms/Button'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../forms/Spinner'
import { Pre } from '../forms/Modal'
import { baseUrl } from '../utils/url'

function AddVideos() {

    const [spinner, setSpinner] = useState(true)

    const [videoForms, setVideoForms] = useState([])
    const [categories, setCategories] = useState([])
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

    const handAddVideo = () => {

        // let day = `${new Date().getDay()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}:${new Date().getHours()}:${new Date().getMinutes()}`
        setVideoForms([...videoForms,
        {
            id: (+new Date * Math.random()).toString(36).substring(0, 10),
            // date:  day,
            title: '',
            video: null,
            clip: null,
            categories: [],
            error: {
                title: false,
                video: false,
                categories: false,
            }
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

        const catCheck = videoForms[index].categories.find(res => res._id === category._id);
        const catIndex = videoForms[index].categories.findIndex(res => res === catCheck)

        if (videoForms[index].id === dataId && catCheck === undefined) {
            videoForms[index].categories.push(category)
            setVideoForms([...videoForms])
        } else if (videoForms[index].id === dataId && catCheck !== undefined) {
            videoForms[index].categories.splice(catIndex, 1)
            setVideoForms([...videoForms])
        }
    }

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
            videoForms[index]['video'] = file
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

        // ERROR HANDLING 
        for (let i = 0; i < videoForms.length; i++) {
            videoForms[i].title === '' ? videoForms[i].error.title = true : videoForms[i].error.title = false
            setVideoForms([...videoForms])
            videoForms[i].video === null ? videoForms[i].error.video = true : videoForms[i].error.video = false
            setVideoForms([...videoForms])
            videoForms[i].categories.length < 1 ? videoForms[i].error.categories = true : videoForms[i].error.categories = false
            setVideoForms([...videoForms])

        }

        // COMFIRMATION THAT THERE IS NO ERROR 
        let confirm = true

        for (let j = 0; j < videoForms.length; j++) {
            if (videoForms[j].error.title === true || videoForms[j].error.categories === true || videoForms[j].error.video === true) {
                confirm = false
                errorNotify("Please make sure all data are inputed in")
                break
            }

        }

        // SERVER SIDE LOGIC

        if (confirm) {

            for (let i = 0; i < videoForms.length; i++) {
                setPro_load({...pro_load, show: true, total: videoForms.length, uploaded: i, toUpload: videoForms.length - i})

                const data = new FormData()
                data.append('title', videoForms[i].title)
                data.append('video', videoForms[i].video)
                data.append('categories', JSON.stringify(videoForms[i].categories))

                try {
                    const response = await axios({
                        method: 'post',
                        url: `${baseUrl}/video`,
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


                // const fileVideo = videoForms[i].video.url

                // const data = new FormData()
                // data.append('file', fileVideo)
                // data.append('upload_preset', 'video_uploads')

                // await axios.post("https://api.cloudinary.com/v1_1/ayomikun/auto/upload", data)
                //     .then(res => {
                //         videoForms[i].video = { cloudinary_id: res.data.public_id, url: res.data.url }
                //         setVideoForms([...videoForms])

                //         try {
                //             const response = axios.post('http://localhost:3001/video', videoForms[i])
                //             setPro_load({...pro_load, uploaded: pro_load.uploaded + 1, toUpload: pro_load.total - pro_load.uploaded, })
                //             console.log(response.data);

                //         } catch (err) {
                //             setPro_load({...pro_load, show: false, uploaded: 0, toUpload: 0, })
                //             errorNotify("Error: Please check your internet connection")
                //             console.log({ message: `Data ${i}, Error saving to database(MongoDb)`, error: err })
                //         }

                //     })
                //     .catch((err) => {
                //         setPro_load({...pro_load, show: false, uploaded: 0, toUpload: 0, })
                //          errorNotify("Error: Please check your internet connection")
                //         console.log({ message: `Data ${i}, Error saving to cloudinary`, error: err })
                //     })
            }

        }
    }

    console.log(videoForms);


    if (spinner) {
        return <Spinner />
    }

    return (
        <>
            {/* <div>
                <img src="folder\\videos\\1674174674036---word.mp4" alt="Trying to display images" />
            </div> */}
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
            <ToastContainer />
            {
                pro_load.show && <Pre data={pro_load} />
            }

        </>
    )
}

export default AddVideos