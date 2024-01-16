import { type ReplacementSuggestion } from '@/hooks/attr-replacement'
import { type Component } from 'solid-js'
import Icon from './icon'
import { ArrowRight } from '@/icon-set'
import Popover from './popover'

interface SuggestionProps extends ReplacementSuggestion {
  onClick: () => void
}

const Suggestion: Component<SuggestionProps> = (props) => {
  return (
    <Popover content="点击替换">
      <span
        class="inline-flex h-10 items-center bg-slate-950 bg-opacity-30 rounded cursor-pointer"
        onClick={() => {
          props.onClick()
        }}
        role="button"
      >
        <span class="p-1 m-2 rounded text-xs bg-slate-500">
          {props.original}
        </span>
        <Icon>
          <ArrowRight />
        </Icon>
        <span class="p-1 m-2 rounded text-xs bg-slate-500">
          {props.replacement}
        </span>
      </span>
    </Popover>
  )
}

export default Suggestion
