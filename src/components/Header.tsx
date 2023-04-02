import Search from './Search'
import Image from 'next/image'
import { Avatar, Flex, Box, Spacer, useBreakpointValue, HStack } from '@chakra-ui/react'
import AccountMenu from './AccountMenu'
export default function Header({ panTo }: { panTo: any }) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const logoSrc = isMobile ? '/logosm.svg' : '/logo.svg'
  const logoHeight = useBreakpointValue({ base: '75px', md: '77px' })
  const logoWidth = useBreakpointValue({ base: '62px', md: '308px' })
  return (
    <Flex as="header" align="center" justify="space-between" wrap="wrap" w="100%">
      <Image height={logoHeight} width={logoWidth} src={logoSrc} alt="logo" />

      <Search panTo={panTo} />

      <AccountMenu />
    </Flex>
  )
}
