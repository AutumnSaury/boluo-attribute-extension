import { createSignal, type Component, createEffect } from 'solid-js'
import Switch from './components/switch'
import Icon from './components/icon'
import { Ninja } from './icon-set'
import { useDialogWindow } from './utils'

const App: Component = () => {
  const [root, setRoot] = createSignal<HTMLDivElement>()

  createEffect(() => {
    console.log(useDialogWindow(root)?.bottomBar)
  })

  return (
    <div ref={setRoot}>
      <Switch>
        <Icon>
          <Ninja />
        </Icon>
      </Switch>
    </div>
  )
}

export default App
