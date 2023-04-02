import React, { useRef } from 'react'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@chakra-ui/react'
interface IPlace {

}
export default function ConfirmMint({
  place,
  onConfirm,
  isOpen,
  onOpen,
  onClose,
}: {
  place?: IPlace,
  onConfirm: () => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const cancelRef = useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Mint this place
          </AlertDialogHeader>

          <AlertDialogBody>Do you wanna mint this place?.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Mint!
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
