import React from 'react'
import { LoginInput } from '../forms/Input'
import { Btn1 } from '../forms/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { baseUrl } from '../utils/url'


function Login() {

    const navigate = useNavigate()

    const [data, setData] = useState({
        username: '',
        password: '',
    })

    const dataField = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            label: 'UserName',
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            label: 'Password',
        },
    ]

    const onChange =(e) => {
        setData({...data, [e.target.name] : e.target.value})
    }

    const handleSubmit = async () => {
        try {
          const response = await axios({
                url: `${baseUrl}/login`,
                method: 'post',
                data: data
            })
            console.log(response.data)
            // navigate('/admin')
        } catch (err) {
            console.log(err)
        }

    }

    // console.log(data);

    return (
        <>
            <div className="login_cont">
                <h1>Login</h1>
                <div className='fs-5 mb-3'>Please enter admin authentication details to proceed</div>
                {
                    dataField.map((input) => (
                        <div key={input.id} className='mt-1 mb-1'>
                            <LoginInput {...input} value={data[input.name]} onChange={onChange} style={{ width: '300px' }} />
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