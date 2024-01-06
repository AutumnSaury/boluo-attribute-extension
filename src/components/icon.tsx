import { type Component, type JSXElement } from 'solid-js'

interface IconProps {
  children: JSXElement
}

const Icon: Component<IconProps> = (props) => {
  return <i class="block text-lg size-4">{props.children}</i>
}

export default Icon
export type { IconProps }
