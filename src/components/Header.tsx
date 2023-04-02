import Search from './Search'
import Image from 'next/image'
import {Avatar, Flex, Box, Spacer} from "@chakra-ui/react"
import AccountMenu from './AccountMenu'
export default function Header({ panTo }: { panTo: any }) {
  return (
    <Flex align="center" mx={3}>
     <Image height="76px" width="306px" src={'/logo.svg'} alt="logo" />
      <Spacer />
     <Search panTo={panTo} />
      <Spacer />
      <AccountMenu />
     
    </Flex>
  )
}
