import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

function AddButton({handleAdd}) {
    return (
        <>
            <button className="btn_add mt-4" onClick={handleAdd}>
                <AiOutlinePlus style={{ margin: '0px' }} />
            </button>
        </>
    )
}

export default AddButton
