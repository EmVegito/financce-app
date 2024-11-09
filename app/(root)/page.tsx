import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBlanaceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'

const Home = () => {
  const loggedIn = { firstName: 'User'}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBlanaceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={12312}
          />
        </header>

        Recent Transactions
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[]}
      />
    </section>
  )
}

export default Home