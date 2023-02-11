import React from 'react'

export const Spinner = () => {
  return (
    <>
        <div className="spinner_cont">
          <div className="spinner">

          </div>
          <div className='spin_text'>Loading...</div>
        </div>
    </>
  )
}

export const SpinnerText = ({text}) => {
  return (
    <>
        <div className="spinner_cont">
          <div className="spinner">

          </div>
          <div className='spin_text'>{text}</div>
        </div>
    </>
  )
}