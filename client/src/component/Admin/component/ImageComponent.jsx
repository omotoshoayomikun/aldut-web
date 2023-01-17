import React, { useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import { Input, MaterializeInput } from '../../forms/Input'
import { Badge } from '../../forms/Badge'
import { Btn1 } from '../../forms/Button'
import { MdCancel, MdCancelPresentation } from 'react-icons/md'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { GiPhotoCamera } from 'react-icons/gi'

function ImageComponent({ RemoveImageForm, value, data, onChange, handleBadge, categories, addImages, selectedImages, handleImgCancel }) {

  const displayImage = (file) => {
    return URL.createObjectURL(file)
  }


  const [index, setIndex] = useState(0)

  const handleArrow = (direction) => {
    if (direction === 'left') {
      setIndex(index !== 0 ? index - 1 : data.images.length - 1)
    }
    if (direction === 'right') {
      setIndex(index !== data.images.length - 1 ? index + 1 : 0)
    }
  }


  return (
    <>
      <div className="d-f mt-4" style={{ gap: '50px', alignItems: 'flex-end' }}>
        <div className='flex1'>
          <div className="files_ds  p-r" style={{ height: '230px' }}>
            {
              data.images.length > 0 ? (
                <div className='p-r' style={{ overflow: 'hidden', height: '200px', width: '100%' }}>
                  <div className="p-a ddsmd" style={{ left: '5px' }} onClick={() => handleArrow('left')}>
                    <FaAngleLeft size='25px' color='#fff' cursor='pointer' />
                  </div>
                  <div className='d-f' style={{ overflow: 'hidden', height: '100%', width: `${100 * data.images.length - 1}%`, transform: `translateX(${-250 * index}px)` }}>
                    {
                      data.images.map((image, i) => (
                        <div key={i} className='p-r' style={{ width: '100%', height: '100%' }}>
                          <img src={image.name ? displayImage(image) : image} alt="" height='100%' width='250px' />
                          <div className='p-a vcmdq' onClick={() => handleImgCancel(data.id, i)}>
                            <MdCancelPresentation
                              cursor='pointer'
                              color='tomato'
                              style={{
                                // boxShadow: '0px 0px 4px #000',
                                margin: '0px',
                              }}
                            />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="dur p-a d-f j-cc a-i"><GiPhotoCamera size='20px' style={{ marginBottom: '0px', marginRight: '5px' }} /> {data.images.length}</div>
                  <div className="p-a ddsmd" style={{ right: '5px' }} onClick={() => handleArrow('right')}>
                    <FaAngleRight size='25px' color='#fff' cursor='pointer' />
                  </div>
                </div>
              )
                :
                (
                  <>
                    <div className='d-ff j-cc a-i' style={{ border: '2px dotted grey', height: '200px', borderRadius: '20px' }}>
                      <input type="file" className='file_in' onChange={(e) => addImages(e, data.id)} multiple accept='image/png, image/jpeg, image/webp' />
                      <div>
                        <BiUpload size='30px' style={{ margin: '0px' }} />
                      </div>
                      <div className="vc1c">Drag & drop any images here</div>
                      <div className="vc2c mt-1">or browse file from device</div>
                    </div>
                  </>
                )
            }
            <button className="btn2 mt-1 p-r" style={{ overflow: 'hidden', }}>
              Upload
              <input className='p-a' type="file" style={{ transform: 'scale(2,2)', opacity: '0', cursor: 'pointer' }} onChange={(e) => addImages(e, data.id)} multiple accept='image/png, image/jpeg, image/webp' />
            </button>
          </div>
          {/* <div className="files_ds  p-r mt-2" style={{ height: 'auto' }}>
            <input type="file" className='file_in' />
            <div className="vc2c d-f j-cc a-i"><BiUpload size='30px' style={{ margin: '0px', marginRight: '10px' }} /> Upload video thumbnails</div>
          </div> */}
        </div>
        <div className='' style={{ width: '100%' }}>
          <h3 className='mb-1' style={{ marginTop: '0px' }}>Add Title</h3>
          <div style={{ width: 'inherit' }}>
            <Input data={data} value={value} onChange={(e) => onChange(e, data.id)} />
          </div>
          <h3 className='mt-1 mb-1'>Select Categories</h3>
          <div className="d-f" style={{ flexWrap: 'wrap', height: '160px', overflowX: 'hidden', overflowY: 'scroll' }} >
            {
              categories.map((category) => (
                <Badge key={category._id} category={category.title} style={{ margin: '10px 10px' }}
                  select={data.categories.find((res) => (res.category._id === category._id)) ? "true" : "false"}
                  handleClick={() => handleBadge(data.id, category)} />
              ))
            }
          </div>
        </div>
        <div className="flex1-5">
          <Btn1 handleBtnClick={RemoveImageForm} text='Remove' />
        </div>
      </div>
      <hr className='mt-4 mb-4' />
    </>
  )
}

export default ImageComponent
