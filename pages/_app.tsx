import '@/styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { ChakraProvider } from '@chakra-ui/react'
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp
