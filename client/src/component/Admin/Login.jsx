import React from 'react'
import { Input } from '../forms/Input'
import { Btn1 } from '../forms/Button'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()

    const dataField = [
        {
            label: 'UserName',
        },
        {
            label: 'UserName',
        },
    ]

    const handleSubmit = () => {
        navigate('/admin')
    }

    return (
        <>
            <div className="login_cont">
                <h1>Login</h1>
                <div className='fs-5 mb-3'>Please enter admin authentication details to proceed</div>
                {
                    dataField.map((data, i) => (
                        <div key={i} className='mt-1 mb-1'>
                            <Input label={data.label} style={{ width: '300px' }} />
                        </div>
                    ))
                }
                <div className="mt-1">
                    <Btn1 text='Sign In' style={{ 'backgroundColor': 'green', fontSize: '15px', }} handleBtnClick={handleSubmit} />
                </div>
            </div>
        </>
    )
}

export default Login