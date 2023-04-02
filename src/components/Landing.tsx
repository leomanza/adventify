import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Logo } from './Login/Logo'
import { PlayIcon } from './Login/ProviderIcons'

export default function WithBackgroundImage() {
    const router = useRouter();
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
        'url(https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2874&q=80)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <Logo />
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
          >
            Our mission is to revolutionize travel memories with a global NFT platform that inspires
            exploration, connection, and lasting memories while supporting artists and local
            businesses worldwide.
          </Text>
          <Stack direction={'row'}>
            <Button
              bg={'blue.400'}
              size={'lg'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'blue.500' }}
              onClick={()=> router.push("/login")}
            >
              Login
            </Button>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              leftIcon={<PlayIcon h={4} w={4} color={'gray.300'} />}
            >
              How It Works
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  )
}
