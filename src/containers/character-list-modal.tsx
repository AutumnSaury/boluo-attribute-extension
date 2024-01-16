import CharacterTable from './character-table'
import Modal from '@/components/modal'
import { type Component } from 'solid-js'

interface CharacterListModalProps {
  shown: boolean
  onClose: () => void
}

const CharacterListModal: Component<CharacterListModalProps> = (props) => {
  return (
    <Modal shown={props.shown} onClose={props.onClose} title="身份列表">
      <CharacterTable />
    </Modal>
  )
}

export default CharacterListModal
