import React from 'react'

function RecommendedVid({datas, controlVid, videoRouter}) {
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