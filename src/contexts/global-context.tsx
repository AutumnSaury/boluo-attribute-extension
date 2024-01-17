import { type DialogWindow } from '@/utils'
import {
  type Component,
  type JSXElement,
  createContext,
  useContext,
  type Accessor
} from 'solid-js'

interface GlobalContextValues {
  dialog: Accessor<DialogWindow | undefined>
}

const GlobalContext = createContext<GlobalContextValues>({
  dialog: () => undefined
})

interface GlobalProviderProps {
  children: JSXElement
  value: GlobalContextValues
}

export const GlobalProvider: Component<GlobalProviderProps> = (props) => {
  return <GlobalContext.Provider {...props} />
}

export const useGlobalContext = (): GlobalContextValues =>
  useContext(GlobalContext)
