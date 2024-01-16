import { type JSXElement, type Component, Show } from 'solid-js'

import Icon from './icon'

interface ButtonProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'plain' | 'transparent'
  type?: 'button' | 'submit' | 'reset'
  round?: boolean
  onClick?: () => void
  icon?: JSXElement
  children?: JSXElement
}

const sizeMap = {
  small: 5,
  medium: 7,
  large: 9
}

const colorMap = {
  primary: 'bg-[#dd6b20]',
  plain: 'bg-[#4a5568]',
  transparent: 'bg-transparent'
}

const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      class={`inline-flex items-center text-white py-2 px-3 ${
        props.round === true
          ? `rounded-full size-${sizeMap[props.size ?? 'medium']} px-0 py-0`
          : 'rounded-[3px]'
      } ${colorMap[props.variant ?? 'transparent']} h-${
        sizeMap[props.size ?? 'medium']
      }`}
      type={props.type}
      onClick={() => {
        props.onClick?.()
      }}
    >
      <Show when={props.icon != null}>
        <span class="mr-1 last:mr-0">
          <Icon>{props.icon}</Icon>
        </span>
      </Show>
      <Show when={props.children != null}>
        <span>{props.children}</span>
      </Show>
    </button>
  )
}

export default Button
