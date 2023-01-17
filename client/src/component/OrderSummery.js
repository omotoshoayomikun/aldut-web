import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderSummery = () => {
    const Navigate = useNavigate()
  return (
    <>
    <h2>Order Summery Confirm</h2>
    <button onClick={() => Navigate(-1)}>Go Back</button>
    </>
  )
}

export default OrderSummery