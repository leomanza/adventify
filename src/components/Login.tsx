import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Login({ supabase }: { supabase: any }) {
  const router = useRouter()
  return (
    <div className="row">
      <div className="col-6">
        <p className="">
          Our mission is to revolutionize travel memories with a global NFT platform that inspires
          exploration, connection, and lasting memories while supporting artists and local
          businesses worldwide.
        </p>
      </div>
      <div className="col-6 auth-widget">
        <Auth
          supabaseClient={supabase}
          providers={['twitter']}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    </div>
  )
}
