import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/url';

function VideoCategory({ vidDetails, controlVid, title, reference }) {

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


    const [view, setView] = useState(4)
    const [viewX, setViewX] = useState(0)

    const handleMore = () => {
        setViewX(view)
        if (vidDetails.length > view) {
            setView(view + 4)
        }
    }

    // if (spinner) {
    //     return (
    //         <>
    //             <div className="ttt mb-3" style={{ fontSize: '20px', }}>{title}</div>
    //             <div className="d-ff j-cc a-i mt-4">
    //                 <div className="md_spinner"></div>
    //                 <div className="spin_text fs-3">Loading...</div>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <>
            <div className="ttt mb-3" style={{ fontSize: '20px', }}>{title}</div>
            <div className="lopd">
                {
                    vidDetails.map((vid, i) => (
                        <div key={i} className="thdf mb-2">
                            <div className="flex1 hfv">
                                <video
                                    src={vid.video}
                                    style={{ objectFit: 'cover' }}
                                    className='vidffd'
                                    muted
                                    onMouseMove={(e) => controlVid(e.target, 'move')}
                                    onMouseLeave={(e) => controlVid(e.target, 'leave')}
                                ></video>
                            </div>
                            <div className="flex1">
                                <div className='ttt'>{vid.title}</div>
                            </div>
                        </div>
                    )).slice(viewX, view)
                }
            </div>
            <div className="p-r mt-5 mb-3">
                <hr />
                <div className='moreVV' onClick={handleMore}>VIEW MORE</div>
            </div>
        </>
    )
}

export default VideoCategory