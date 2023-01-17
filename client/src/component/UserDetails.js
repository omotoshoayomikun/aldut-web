import React from 'react'
import { useParams } from 'react-router-dom'

export const UserDetails = () => {
    const params = useParams()
    const { userId } = params
  return (
    <div>
        <div>User Details about user {userId}</div>
    </div>
  )
}
