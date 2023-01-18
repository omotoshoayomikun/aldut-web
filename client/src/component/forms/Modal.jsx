import React from 'react'
import { FcCancel } from 'react-icons/fc'
import { Btn1 } from './Button'
import { ImCheckmark } from 'react-icons/im'

export function ErrorModal({ text, setDisplay, handleErrYes }) {
    return (
        <>
            <div className='modalCont'>
                <div className='modalWrap' onClick={() => setDisplay(false)}></div>
                <div className="modal-wrap">
                    <FcCancel size='100px' />
                    <div className='mt-1 fs-6' style={{ textAlign: 'center', fontWeight: 'bolder' }}>{text} </div>
                    <div className='d-f mt-4'>
                        <form className='mr-2'>
                            <Btn1 text='Yes' style={{ 'backgroundColor': 'green' }} handleBtnClick={handleErrYes} />
                        </form>
                        <div className='ml-3' onClick={() => setDisplay(false)}>
                            <Btn1 text='No' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export function SuccessModal({ text, handleOk }) {
    return (
        <>
            <div className='modalCont'>
                {/* <div className='modalWrap' onClick={() => setDisplay(false)}></div> */}
                <form className="modal-wrap">
                    <img src='/images/correct.png' width='90' height='90' />
                    <div className='mt-1 fs-6' style={{ textAlign: 'center', fontWeight: 'bolder' }}> {text} </div>
                    <div className='d-f mt-4'>
                        <div className='mr-2' onSubmit={handleOk}>
                            <Btn1 text='Okay' style={{ 'backgroundColor': 'green' }} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export const Pre = ({data}) => {
    return (
        <>
            <div className='modalCont'>
                <div className="modal-wrap">
                    <div style={{ fontSize: '20px' }} className='spin_text'>Please Wait!!!</div>
                    <img src="/images/cloud.gif" alt="" width='300px' height='160px' />
                    <div>
                        <div className="d-f a-i j-cc mb-1">
                            <div className='mr-1 fw-1'>Total Data:</div>
                            <div className='mr-1 '>{data.total}</div>
                        </div>
                        <div className="d-f a-i j-cc mb-1">
                            <div className='mr-1 fw-1'>Data to upload:</div>
                            <div className='mr-1'>{data.toUpload}</div> <div className="small_spinner"></div>
                        </div>
                        <div className="d-f a-i j-cc mb-1">
                            <div className='mr-1 fw-1'>Data uploaded:</div>
                            <div className='mr-1 '>{data.uploaded} <ImCheckmark color='green' className='ml-1' /> </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}