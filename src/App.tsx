import { createSignal, onMount, type Component } from 'solid-js'
import Icon from './components/icon'
import Popover from './components/popover'
import Switch from './components/switch'
import AddCharacterModal from './containers/add-character-modal'
import CharacterListModal from './containers/character-list-modal'
import SuggestionList from './containers/suggestion-list'
import { AddUser, Ninja, Replace } from './icon-set'
import { useDialogWindow } from './utils'

let dialog: ReturnType<typeof useDialogWindow>

const App: Component = () => {
  const [root, setRoot] = createSignal<HTMLDivElement | undefined>(undefined, {
    equals: false
  })
  const [autoReplacement, setAutoReplacement] = createSignal(false)
  const [characterListShown, setCharacterListShown] = createSignal(false)
  const [addCharacterShown, setAddCharacterShown] = createSignal(false)
  dialog = useDialogWindow(root)

  onMount(() => {
    setRoot((prev) => prev)
  })

  return (
    <div ref={setRoot} class="flex flex-row">
      <CharacterListModal
        shown={characterListShown()}
        onClose={() => {
          setCharacterListShown(false)
        }}
      />
      <AddCharacterModal
        shown={addCharacterShown()}
        onClose={() => {
          setAddCharacterShown(false)
        }}
      />
      <div class="flex flex-row">
        <div class="mr-1">
          <Popover content="添加身份">
            <Switch
              onClick={() => {
                setAddCharacterShown(true)
              }}
            >
              <Icon>
                <AddUser />
              </Icon>
            </Switch>
          </Popover>
        </div>
        <div class="mr-2">
          <Popover content="自动属性值替换">
            <Switch
              onClick={() => {
                setAutoReplacement((v) => !v)
              }}
              value={autoReplacement()}
            >
              <Icon>
                <Replace />
              </Icon>
            </Switch>
          </Popover>
        </div>
        <div class="mr-1">
          <Popover content="身份管理">
            <Switch
              onClick={() => {
                setCharacterListShown(true)
              }}
            >
              <Icon>
                <Ninja />
              </Icon>
            </Switch>
          </Popover>
        </div>
        {/* FIXME: 溢出 */}
        <SuggestionList dialog={dialog()} autoReplacement={autoReplacement()} />
      </div>
    </div>
  )
}

export default App
export { dialog }
