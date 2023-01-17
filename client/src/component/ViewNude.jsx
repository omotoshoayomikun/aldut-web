import React from 'react'
import { Btn1 } from './forms/Button'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ViewNude() {

    const navigate = useNavigate()

    const [index, setIndex] = useState(0)

    const images = [
        '/images/Deals.png',
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg',
        '/images/2.jpg',
        '/images/3.jpg',
        '/images/2.jpg',
        '/images/1.jpg',
    ]


    const handleArrow = (direction) => {
        if (direction === 'left') {
            setIndex(index !== 0 ? index - 1 : images.length - 1)
        }
        if (direction === 'right') {
            setIndex(index !== images.length - 1 ? index + 1 : 0)
        }
    }

    return (
        <>
            <div className="modalCont">
                <div className='modalWrap' onClick={() => navigate('/nudes')}></div>
                <div className="p-a left" style={{  }} onClick={() => handleArrow('left')}>
                    <FaAngleLeft size='40px' color='#fff' cursor='pointer' />
                </div>
                <div className="xcxz">
                    <div className="d-f a-i j-cs mb-3">
                        <h2 className='mt-0 mb-0'>Gallery</h2>
                        <div>
                            <Btn1 text='download' style={{ 'backgroundColor': '#05a081' }} />
                        </div>
                    </div>
                    <div className="cmvn">
                        <div className='bmnkg' style={{ overflow: 'hidden', position: 'relative' }}>
                            <div style={{ width: `${100 * images.length - 1}%`, height: '100%', display: 'flex', transform: `translateX(${-12.5 * index}%)` }}>
                                {
                                    images.map((img, i) => (
                                        <div key={i} style={{ width: '100%', height: '100%', position: 'relative' }} >
                                            <img src={img} style={{ width: '100%', height: '100%', borderRadius: '9px' }} alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="cxawq">
                            {
                                images.map((img, i) => (
                                    <div key={i} className=''  onClick={() => setIndex(i)}>
                                        <img src={img} className='mnbl' style={{border: index === i ? '3px solid green' : '3px solid white', borderRadius: '9px',}} alt="" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="p-a right" style={{  }} onClick={() => handleArrow('right')}>
                    <FaAngleRight size='40px' color='#fff' cursor='pointer' />
                </div>
            </div>
        </>
    )
}

export default ViewNude