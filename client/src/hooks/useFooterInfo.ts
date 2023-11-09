import { useEffect, useState } from 'react'
import type { UseFooterInfoReturn } from '../interfaces/todo.interface'
import { useFilterTodos } from '../stores/filterTodosStore'
import { useTodosStore } from '../stores/todosStore'

const useFooterInfo = (): UseFooterInfoReturn => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { loading, removeAllCompleted } = useTodosStore()
  const { activeCount, completedCount, setActiveCount, setCompletedCount } =
    useFilterTodos()

  const showPopconfirm = (): void => {
    setOpen(true)
  }

  const handleCancel = (): void => {
    setOpen(false)
  }

  useEffect(() => {
    setActiveCount()
    setCompletedCount()
    if (!loading) {
      setOpen(false)
      setConfirmLoading(false)
    }
  }, [loading])

  return {
    showPopconfirm,
    handleCancel,
    open,
    confirmLoading,
    activeCount,
    completedCount,
    removeAllCompleted,
    setConfirmLoading
  }
}

export default useFooterInfo
