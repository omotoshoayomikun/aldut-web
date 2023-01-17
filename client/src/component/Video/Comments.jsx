import React from 'react'
import { MaterializeInput } from '../forms/Input'
import { BtnWithIcon } from '../forms/Button'
import { BiChevronsLeft, BiChevronsRight, BiSend } from 'react-icons/bi'

function Comments() {
    return (
        <>
            <h4 className='mb-1'>200 Comments</h4>
            <div className="d-f" style={{ gap: '20px', alignItems: 'flex-end' }}>
                {/* <div className="avater" style={{}}>
                    <img src='/images/Deals.png' width='100%' height='100%' style={{ borderRadius: '50%', }} />
                </div> */}

                <div className='flex1 d-f' style={{ gap: '30px' }}>
                    <div className='flex1'>
                        <MaterializeInput placeholder='Enter your name' />
                    </div>
                    <div className='flex1'>
                        <MaterializeInput placeholder='Add a comment' />
                    </div>
                    <div>
                        <BtnWithIcon icon={<BiSend size='15px' />} text='Comment' />
                    </div>
                </div>
            </div>

            <div className="d-f mt-4" style={{ gap: '20px', alignItems: 'flex-end' }}>
                <div className="avater" style={{ width: '40px', height: '40px' }}>
                    <img src='/images/Deals.png' width='100%' height='100%' style={{ borderRadius: '50%', }} />
                </div>
                <div className='flex1'>
                    <h3 className='mt-0 mb-0'>Omotosho</h3>
                    <small>I have commentted on this post so you can see for yourself</small>
                </div>
            </div>
            <div className="d-f mt-4" style={{ gap: '20px', alignItems: 'flex-end' }}>
                <div className="avater" style={{ width: '40px', height: '40px' }}>
                    <img src='/images/Deals.png' width='100%' height='100%' style={{ borderRadius: '50%', }} />
                </div>
                <div className='flex1'>
                    <h3 className='mt-0 mb-0'>Olumighty</h3>
                    <small>He is the best graphics design in town</small>
                </div>
            </div>
            <div className="d-f mt-4" style={{ gap: '20px', alignItems: 'flex-end' }}>
                <div className="avater" style={{ width: '40px', height: '40px' }}>
                    <img src='/images/Deals.png' width='100%' height='100%' style={{ borderRadius: '50%', }} />
                </div>
                <div className='flex1'>
                    <h3 className='mt-0 mb-0'>Tolu</h3>
                    <small>Wow!!! This is amazing</small>
                </div>
            </div>
            <div className="d-f j-cs mt-4">
                <div>
                    <BtnWithIcon icon={<BiChevronsLeft />} text='Prev' />
                </div>
                <div>
                    <BtnWithIcon icon={<BiChevronsRight />} text='Next' />
                </div>
            </div>
        </>
    )
}

export default Comments