import { resolveIPFSUrl } from '@/utils/resolveIPFSUrl'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link,
} from '@chakra-ui/react'
import axios from 'axios'
import useSWR from 'swr'

type Props = {
  imageUrl: string
  metadataUrl: string
  tokenId: number
  closeModal: () => void
}

function MintedModal({ imageUrl, metadataUrl, tokenId, closeModal }: Props) {
  const { isLoading, data } = useSWR<{ data: { name: string; description: string } }>(
    metadataUrl,
    () => axios.get(resolveIPFSUrl(metadataUrl))
  )

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Place collected!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>{isLoading && 'Loading...'}</div>
          <img src={resolveIPFSUrl(imageUrl)} />
          <div>{data?.data.name}</div>
          <div>{data?.data.description}</div>
          <Link
            href={`https://testnets.opensea.io/assets/mumbai/${process.env.NEXT_PUBLIC_ADVENTIFY}/${tokenId}`}
            target="_blank"
          >
            See on Opensea
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MintedModal
