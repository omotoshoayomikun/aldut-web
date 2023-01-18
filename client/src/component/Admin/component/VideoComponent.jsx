import React from 'react'
import { BiUpload } from 'react-icons/bi'
import { Badge } from '../../forms/Badge'
import { Input, MaterializeInput } from '../../forms/Input'
import { Btn1 } from '../../forms/Button'


function VideoComponent({ data, RemoveVideoForm, onChange, value, handleBadge, categories, handleUploadVid, handleUploadClip }) {

    return (
        <>
            <div className="d-f mt-4" style={{ gap: '50px', alignItems: 'flex-end', }}>
                <div className='flex1'>
                    <div className="files_ds  p-r">

                        {
                            data.video.url ? (
                                <>
                                    <div className='d-ff j-cc a-i' style={{ border: '2px dotted grey', height: '120px', borderRadius: '20px' }}>
                                        Video Added
                                        <input type="file" className='file_in' accept='.mp4, .mkv' onChange={(e) => handleUploadVid(e, data.id)} />
                                    </div>
                                </>
                            ) :
                                (
                                    <>
                                        <div className='d-ff j-cc a-i' style={{ border: data.error.video ? '2px dotted tomato' : '2px dotted grey', height: '120px', borderRadius: '20px' }}>
                                            <input type="file" className='file_in' accept='.mp4, .mkv' onChange={(e) => handleUploadVid(e, data.id)} />
                                            <div>
                                                <BiUpload size='30px' style={{ margin: '0px' }} />
                                            </div>
                                            <div className="vc1c">Drag & drop any video here</div>
                                            <div className="vc2c mt-1">or browse file from device</div>
                                        </div>
                                    </>
                                )
                        }

                        <button className="btn2 mt-1">Upload</button>
                    </div>
                    {/* error display for video */}
                    {
                        data.error.video && <small style={{ color: 'tomato' }}>Please upload video</small>
                    }
                    <div className="files_ds  p-r mt-2" style={{ height: 'auto' }}>
                        {
                            data.clip !== null ? (
                                <>
                                    Clip Upload
                                    <input type="file" className='file_in' accept='.mp4, .mkv' onChange={(e) => handleUploadClip(e, data.id)} />
                                </>
                            ) : (
                                <>
                                    <input type="file" className='file_in' accept='.mp4, .mkv' onChange={(e) => handleUploadClip(e, data.id)} />
                                    <div className="vc2c d-f j-cc a-i"><BiUpload size='30px' style={{ margin: '0px', marginRight: '10px' }} /> Upload video clip</div>
                                </>
                            )
                        }
                    </div>

                </div>
                <div className='' style={{ width: '100%' }}>
                    <h3 className='mb-1' style={{ marginTop: '0px' }}>Add Title</h3>
                    <div style={{ width: 'inherit' }}>
                        <Input label='Add title' value={value} error={data.error.title.toString()} onChange={(e) => onChange(e.target.value, data.id)} />
                    </div>
                    {/* error display for title */}
                    {
                        data.error.title && <small style={{ color: 'tomato' }}>Please enter title for the video</small>
                    }
                    <h3 className='mt-1 mb-1'>Select Categories</h3>
                    <div className="d-f" style={{ flexWrap: 'wrap', height: '160px', overflowX: 'hidden', overflowY: 'scroll', border: data.error.categories ? '1px solid tomato' : 'none', borderRadius: '10px' }} >
                        {
                            categories.map((category) => (
                                <Badge key={category._id} category={category.title} style={{ margin: '10px 10px' }}
                                    select={data.categories.find((res) => (res.category._id === category._id)) ? "true" : "false"}
                                    handleClick={() => handleBadge(data.id, category)}
                                />
                            ))
                        }
                    </div>
                    {/* error display for categories */}
                    {
                        data.error.categories && <small style={{ color: 'tomato' }}>Please select categories for the video</small>
                    }

                </div>
                <div className="flex1-5">
                    <Btn1 handleBtnClick={RemoveVideoForm} text='Remove' />
                </div>
            </div>
            <hr className='mt-4 mb-4' />
        </>
    )
}

export default VideoComponent
