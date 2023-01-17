import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import '../../styles/Forms.css'

function Search() {
    return (
        <>
            <div className="input-container">
                <input type="text" className='style-input' style={{width: '200px'}} placeholder='Search' />
                <div className="input-search">
                    <AiOutlineSearch />
                </div>
            </div>
        </>
    )
}

export default Search