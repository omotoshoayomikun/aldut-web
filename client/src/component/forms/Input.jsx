import React from 'react'

export const Input = ({ label, style, value, onChange, error }) => {
    return (
        <div>
            <div className='p-r input-wrap'>
                <input type="text" className='input' error={error} value={value} style={style} onChange={onChange} placeholder=' ' />
                <span className="floating-label">{label}</span>
            </div>
        </div>
    )
}


export const MaterializeInput = ({ placeholder, style, onChange, value }) => {

    return (
        <div>
            <div className='p-r input-wrap'>
                <input type="text" className='input1' placeholder={placeholder} style={style} value={value} onChange={(e) => onChange(e)} />
            </div>
        </div>
    )
}

export const InputWithKeyPress = ({ label, style, value, setValue, handleEnter }) => {

    return (
        <div>
            <div className='p-r input-wrap'>
                <input type="text" className='input' value={value} style={style} onChange={(e) => setValue(e.target.value)} onKeyPress={(e) => handleEnter(e)} placeholder=' ' />
                <span className="floating-label">{label}</span>
            </div>
        </div>
    )
}


export const LoginInput = (props) => {
    const { label, style, onChange, id, ...inputProps } = props
    return (
        <div>
            <div className='p-r input-wrap'>
                <input {...inputProps} onChange={onChange} style={style}  className='input' placeholder=' ' />
                <span className="floating-label">{label}</span>
            </div>
        </div>
    )
}

