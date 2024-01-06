import { GM, GM_addValueChangeListener } from '$'
import { createResource, type Accessor } from 'solid-js'

interface Character {
  name: string
  attributes: Record<string, number>
}

type CLSetterArg =
  | Character[]
  | ((prev: Character[] | undefined) => Character[])

export function useCharacterStore(): [
  Accessor<Character[] | undefined>,
  (value: CLSetterArg) => Character[]
] {
  const [
    characterList,
    { refetch: refetchCharacterList, mutate: mutateCharacterList }
  ] = createResource<Character[]>(
    async () => await GM.getValue<Character[]>('boluoCharacterList', [])
  )
  const setCharacterList = (value: CLSetterArg): Character[] => {
    const newVal = mutateCharacterList(value)
    void GM.setValue('boluoCharacterList', newVal)
    return newVal
  }

  GM_addValueChangeListener('boluoCharacterList', () => {
    void refetchCharacterList()
  })

  return [characterList, setCharacterList] as const
}
