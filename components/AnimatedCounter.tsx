"use client"
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount } : { amount: number }) => {
  return (
    <div className='w-full'>
      <p className='total-balance-amount'>
        <CountUp
          end={amount}
          decimals={2}
          decimal=','
          prefix='₹'
        />
      </p>
    </div>
  )
}

export default AnimatedCounter