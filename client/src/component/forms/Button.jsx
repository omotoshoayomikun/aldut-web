import React from 'react'

export function Btn1({handleBtnClick, text, style}) {
    return (
        <>
            <button className="btn1" onClick={handleBtnClick} style={style} >{text}</button>
        </>
    )
}

export function BtnWithIcon({handleBtnClick, text, style, icon}) {
    return (
        <>
            <button className="btnIcon d-f a-i" onClick={handleBtnClick} style={style} > {icon} {text}</button>
        </>
    )
}

