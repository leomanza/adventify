import { UserStore } from '@/stores/user.store';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  Link,
  IconButton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { FaBars, FaSignOutAlt} from 'react-icons/fa'
export default function AccountMenu() {
  const router = useRouter()
    const removeAuthInfo = UserStore((state) => state.removeAuthInfo);
    const onSignOut = (e: any) => {
        removeAuthInfo();
        router.push("/")
    }
  return (
    <Menu>
      <MenuButton
        p={0}
        bg={'inherit'}
        variant="outline"
        aria-label={'dapp selector'}
        icon={<FaBars />}
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="20px"
        as={IconButton}
      >
        <FaBars size="24" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <HStack justifyContent="flex-end" onClick={onSignOut}>
            <Text>
              Sign out 
            </Text>
            <FaSignOutAlt size={24} />
          </HStack>
        </MenuItem>
       
      </MenuList>
    </Menu>
  )
}
