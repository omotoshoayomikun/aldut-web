import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { baseUrl } from '../utils/url'

function RecommendedVid({ datas, controlVid, videoRouter }) {

    const [video, setVideo] = useState({})
    const [spinner, setspinner] = useState(true)


    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await axios.get(`${baseUrl}/video/`)
                setVideo(response.data)
                setspinner(false)
            } catch (err) {
                setspinner(false)
                console.log(err);
            }
        }
        // getVideo()
    }, [])


    // if (spinner) {
    //     return (
    //         <>
    //             <div className="d-ff j-cc a-i mt-4">
    //                 <div className="md_spinner"></div>
    //                 <div className="spin_text fs-3">Loading...</div>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <>
            <div className="wrapperX mt-5" style={{ width: '100%', }}>
                {
                    datas.map((data, i) => (
                        <div className="wrapX" key={i}>
                            <div className='p-r'>
                                <video
                                    src={data.video}
                                    muted
                                    style={{ objectFit: 'cover' }}
                                    width='100%'
                                    height='160px'
                                    // className='video'
                                    onMouseMove={(e) => controlVid(e.target, 'move')}
                                    onMouseLeave={(e) => controlVid(e.target, 'leave')}
                                    onClick={() => videoRouter(i)}
                                ></video>
                                <div className="dur">28:50</div>
                            </div>
                            <div className='bbtxt'>{data.title}</div>
                            <div className='smalltxt'>{data.category}</div>
                        </div>
                    )).slice(0, 18)
                }
            </div>
            <div className="p-r">
                <hr />
                <div className='moreVV'>VIEW MORE</div>
            </div>
        </>
    )
}

export default RecommendedVid