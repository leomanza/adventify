import type { NextPage } from 'next'

import Account from '../src/components/Account'
import Footer from '../src/components/Footer'
import Login from '../src/components/Login'
import Dashboard from '../src/components/Dashboard'
import { UserStore } from '../src/stores/user.store'
import { useEffect, useState } from 'react'
import Landing from '@/components/Landing'

const Home: NextPage = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
const isAuthenticated = UserStore((state) => state.isAuthenticated);

  return (
    <div>
      {!isAuthenticated ? (
        <Landing  />
      ) : (
        <>
          <Dashboard />
        </>
      )}

      <Footer />
    </div>
  )
}

export default Home
