import { ref } from 'vue'

const dialog = ref([])

export const useDialog = (value) => {
  const open = () => (dialog.value[value] = true)

  const close = () => (dialog.value[value] = false)

  const isOpen = () => dialog.value[value]

  return {
    open,
    close,
    isOpen
  }
}
