import { UserStore } from '@/stores/user.store'
import useSWR from 'swr'
import axios from 'axios'

export default function useUserPlaces() {
  const user = UserStore((state) => state.user)
  return useSWR(user?.email ? `user-places-${user?.email}` : null, () =>
    axios.get<
      {
        id: string
        type: string
        tokenId: number
        name: string
        location?: { latitude: number; longitude: number }
        imageUrl: string
        metadataUrl: string
      }[]
    >(`/api/place/${encodeURI(user!.email)}`)
  )
}
