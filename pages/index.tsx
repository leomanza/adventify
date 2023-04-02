import type { NextPage } from 'next'

import Account from '../src/components/Account'
import Footer from '../src/components/Footer'
import Login from '../src/components/Login'
import Dashboard from '../src/components/Dashboard'
import { UserStore } from '../src/stores/user.store'

const Home: NextPage = () => {
  const user = UserStore((state) => state.user);

  return (
    <div>
      {!user ? (
        <Login  />
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
