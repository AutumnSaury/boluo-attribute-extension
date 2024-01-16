import { useCharacterStore } from '@/store'
import { For, createSignal, type Component } from 'solid-js'
import Button from '../components/button'
import AddCharacterModal from './add-character-modal'
import { setID } from '@/utils'

const CharacterTable: Component = () => {
  const { characterList, setCharacterList, setActiveCharacter } =
    useCharacterStore()
  const [editShown, setEditShown] = createSignal(false)
  return (
    <table class="w-full">
      <thead>
        <tr>
          <th>角色名</th>
          <th>当前使用</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <For each={characterList()}>
          {(item) => (
            <tr>
              <AddCharacterModal
                shown={editShown()}
                onClose={() => {
                  setEditShown(false)
                }}
                initName={item.name}
                initAttributes={item.attributes}
              />
              <td class="text-center">{item.name}</td>
              <td class="text-center">{item.active ? '是' : '否'}</td>
              <td class="flex justify-around">
                <Button
                  variant="primary"
                  onClick={() => {
                    setActiveCharacter(item.name)
                    void setID(item.name)
                  }}
                >
                  启用
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditShown(true)
                  }}
                >
                  重新导入
                </Button>
                <Button
                  variant="plain"
                  onClick={() => {
                    setCharacterList((prev) => {
                      const newList =
                        prev?.filter((i) => i.name !== item.name) ?? []
                      return newList
                    })
                  }}
                >
                  删除
                </Button>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  )
}

export default CharacterTable
