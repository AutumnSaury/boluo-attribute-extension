import { Show, type Component, type JSXElement } from 'solid-js'

interface PopoverProps {
  children?: JSXElement
}

const Popover: Component<PopoverProps> = (props) => {
  return (
    <div>
      <Show when={props.children != null}>
        <div>{props.children}</div>
      </Show>
    </div>
  )
}

export default Popover
