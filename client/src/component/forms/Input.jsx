import React from 'react'

export const Input = ({ label, style, value, onChange }) => {
    return (
        <div>
            <div className='p-r input-wrap'>
                <input type="text" className='input' value={value} style={style} onChange={onChange} placeholder=' ' />
                <span className="floating-label">{label}</span>
            </div>
        </div>
    )
}


export const MaterializeInput = ({ placeholder, style }) => {

    return (
        <div>
            <div className='p-r input-wrap'>
                <input type="text" className='input1' placeholder={placeholder} style={style} />
            </div>
        </div>
    )
}

export const InputWithKeyPress = ({ label, style, value, setValue, handleEnter  }) => {

    return (
        <div>
        <div className='p-r input-wrap'>
            <input type="text" className='input' value={value} style={style} onChange={(e) => setValue(e.target.value)} onKeyPress={(e) => handleEnter(e)} placeholder=' ' />
            <span className="floating-label">{label}</span>
        </div>
    </div>
    )
}

