import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'

const Home: NextPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div >
      {!session ? (
        <Login supabase={supabase} />
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
