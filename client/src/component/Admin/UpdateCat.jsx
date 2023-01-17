import React from 'react'
import { Input } from '../forms/Input'
import { Btn1 } from '../forms/Button'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SuccessModal } from '../forms/Modal'

function UpdateCat({ setDisplay, catId }) {

    const navigate = useNavigate()

    const [cat, setCat] = useState({})
    const [succDis, setSuccDis] = useState(false)

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/category/${catId}`)
                setCat(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCat()
    }, [])

    const onChange = (e) => {
        setCat({ ...cat, title: e.target.value })
    }


    const handleUpdate = async () => {
        try {
            const res = await axios.put(`http://localhost:3001/category/${catId}`, cat)
            setSuccDis(true)
        } catch (err) {
            console.log(err);
        }
    }

    const handleOk = () => {
        navigate('/admin/addcategory')
        setSuccDis(false)
        setDisplay(false)
    }

    return (
        <>
            <div className="modalCont">
                <div className='modalWrap' onClick={() => setDisplay(false)}></div>
                <div className="modal-wrap">
                    <h3>Update Category</h3>
                    <div className="d-f mb-1" style={{ gap: '30px' }}>
                        <Input style={{ 'width': 'inherit' }} value={cat.title} onChange={(e) => onChange(e)} />
                        <div>
                            <Btn1 text='Update' handleBtnClick={handleUpdate} style={{ fontSize: '15px', backgroundColor: 'green' }} />
                        </div>
                    </div>
                </div>
            </div>
            {
                succDis && (
                    <SuccessModal text='Category updated successfully' handleOk={handleOk} />
                )
            }
        </>
    )
}

export default UpdateCat