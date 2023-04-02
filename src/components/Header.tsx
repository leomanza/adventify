import Search from './Search'
import Image from 'next/image'
import { Avatar, Flex, Box, Spacer, useBreakpointValue } from '@chakra-ui/react'
import AccountMenu from './AccountMenu'
export default function Header({ panTo }: { panTo: any }) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const logoSrc = isMobile ? '/logosm.svg' : '/logo.svg'
  return (
    <Flex align="center" mx={{ base: 0, md: 3 }}>
      <Image height="76px" width="306px" src={logoSrc} alt="logo" />
      <Spacer />
      <Search panTo={panTo} />
      <Spacer />
      <AccountMenu />
    </Flex>
  )
}
