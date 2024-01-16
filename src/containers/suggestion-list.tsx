import Suggestion from '@/components/suggestion'
import {
  replaceAttribute,
  useAttributeReplacementSuggestion
} from '@/hooks/attr-replacement'
import { useCharacterStore } from '@/store'
import { type DialogWindow } from '@/utils'
import { For, type Component, createEffect, on } from 'solid-js'

interface SuggestionListProps {
  dialog?: DialogWindow
  autoReplacement: boolean
}

const SuggestionList: Component<SuggestionListProps> = (props) => {
  const { activeCharacter } = useCharacterStore()

  const suggestions = () =>
    useAttributeReplacementSuggestion(
      props.dialog?.inputContent,
      () => activeCharacter()?.attributes ?? {}
    )

  createEffect(
    on(
      () => ({ suggestions: suggestions(), auto: props.autoReplacement }),
      ({ suggestions, auto }) => {
        if (auto) {
          const suggestion = suggestions[0]
          if (suggestion != null) {
            props.dialog?.setInputContent((prev) =>
              replaceAttribute(prev, suggestion)
            )
          }
        }
      }
    )
  )

  return (
    <div class="flex-1 grid grid-rows-1 grid-flow-col gap-2">
      <For each={suggestions()}>
        {(item) => (
          <Suggestion
            {...item}
            onClick={() => {
              props.dialog?.setInputContent((prev) =>
                replaceAttribute(prev, item)
              )
            }}
          />
        )}
      </For>
    </div>
  )
}

export default SuggestionList
