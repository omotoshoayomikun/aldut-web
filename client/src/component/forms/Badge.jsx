import React from 'react'

export function Badge({ category, style, handleClick, select }) {

    return (
        <div>
            <div className="badge" style={style} select={select} onClick={handleClick}>
                {category} 
            </div>
        </div>
    )
}


export function BadgeWithIcon({ category, style, handleCancelCat, icon }) {

    return (
        <>
            <div className="badge" style={style}  onClick={(e) => handleCancelCat(category)} >
                {category.title} <small className='ml-2'>{icon}</small>
            </div>
        </>
    )
}