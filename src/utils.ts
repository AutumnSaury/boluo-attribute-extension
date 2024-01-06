import { type Accessor } from 'solid-js'

export function setEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false
  for (const item of a) {
    if (!b.has(item)) return false
  }
  return true
}

export function setSubtract<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>()
  for (const item of a) {
    if (!b.has(item)) result.add(item)
  }
  return result
}

export function setUnion<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>()
  for (const item of a) result.add(item)
  for (const item of b) result.add(item)
  return result
}

export interface DialogWindow {
  bottomBar: HTMLDivElement
  dialog: HTMLDivElement
  topBar: HTMLDivElement
  inputArea: HTMLTextAreaElement
  sendButton: HTMLButtonElement
  openIDModal: () => Promise<IDModal>
  setID: (id: string) => Promise<void>
}

interface IDModal {
  closeButton: HTMLButtonElement
  idInput: HTMLInputElement
  submitButton: HTMLButtonElement
}

function simulateNativeInput(el: HTMLInputElement, value: string): void {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  )!.set!
  nativeInputValueSetter.call(el, value)
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

export function useDialogWindow(
  appRoot: Accessor<HTMLDivElement | undefined>
): DialogWindow | null {
  return appRoot() != null
    ? (() => {
        const root = appRoot()!
        const bottomBar = root.parentElement!.parentElement! as HTMLDivElement
        const dialog = bottomBar.previousElementSibling! as HTMLDivElement
        const topBar = dialog.previousElementSibling! as HTMLDivElement
        const inputArea =
          bottomBar.querySelector<HTMLTextAreaElement>('.css-o3nsyu')!
        const sendButton =
          bottomBar.querySelector<HTMLButtonElement>('.css-ks2ywa')!

        const openIDModal = async (): Promise<IDModal> => {
          return await new Promise((resolve) => {
            const userButton =
              topBar.querySelector<HTMLButtonElement>('.css-1cdmsla')!
            userButton.click()
            requestAnimationFrame(() => {
              const editIDMenuItem =
                document.querySelector<HTMLDivElement>('.css-y6z4l5')!
              editIDMenuItem.click()
              requestAnimationFrame(() => {
                const closeButton =
                  document.querySelector<HTMLButtonElement>('.css-1ecu4hv')!
                const idInput =
                  document.querySelector<HTMLInputElement>('#characterName')!
                const submitButton = document.querySelector<HTMLButtonElement>(
                  '.css-1pv2q34[type=submit]'
                )!
                resolve({ closeButton, idInput, submitButton })
              })
            })
          })
        }

        const setID = async (id: string): Promise<void> => {
          const { idInput, submitButton } = await openIDModal()
          simulateNativeInput(idInput, id)
          submitButton.click()
        }

        return {
          bottomBar,
          dialog,
          topBar,
          inputArea,
          sendButton,
          openIDModal,
          setID
        }
      })()
    : null
}
