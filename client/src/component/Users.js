import React from 'react'
import { Link } from 'react-router-dom'

export const Users = () => {
  return (
    <div>
        <Link to='/users/1'>User 1</Link>
        <Link to='/users/2'>User 2</Link>
        <Link to='/users/3'>User 3</Link>
    </div>
  )
}
