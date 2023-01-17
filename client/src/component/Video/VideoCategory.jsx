import React from 'react'
import { useState } from 'react'

function VideoCategory({vidDetails, controlVid, title}) {

    const [view, setView] = useState(4)
    const [viewX, setViewX] = useState(0)

    const handleMore = () => {
        setViewX(view)
        if(vidDetails.length > view) {
            setView(view + 4)
        }
    }
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