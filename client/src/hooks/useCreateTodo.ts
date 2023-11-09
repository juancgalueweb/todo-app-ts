import { Form } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { translateSpaToEngPriority } from '../helpers/translatePriorities'
import {
  SpaPriority,
  type TodoSave,
  type UseCreateTodoReturn
} from '../interfaces/todo.interface'
import { useTagsStore } from '../stores/tagsStore'
import { useTodosStore } from '../stores/todosStore'

const useCreateTodo = (): UseCreateTodoReturn => {
  const [form] = Form.useForm()
  const [openTag, setOpenTag] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { loading, saveTodo } = useTodosStore()
  const { getTags } = useTagsStore()
  const initialData = {
    title: '',
    priority: SpaPriority.baja,
    deadline: null,
    tags: []
  }

  const createTodo = (values: TodoSave): void => {
    const dateToDb = dayjs(values.deadline).toDate()
    const translatedPriority = translateSpaToEngPriority(values.priority)
    setConfirmLoading(true)
    saveTodo({
      title: values.title,
      deadline: dateToDb,
      priority: translatedPriority,
      tags: values.tags
    })
    form.resetFields()
  }

  const handleSubmit = (values: TodoSave): void => {
    createTodo(values)
  }

  const showModal = (): void => {
    setOpen(true)
  }

  const handleCancel = (): void => {
    setOpen(false)
    form.resetFields()
  }

  const showTagModal = (): void => {
    setOpenTag(true)
  }

  const handleCancelTag = (): void => {
    setOpenTag(false)
  }

  useEffect(() => {
    // Cuando loading cambia a false, establece confirmLoading en false.
    if (!loading) {
      setOpen(false)
      setConfirmLoading(false)
    }
  }, [loading]) // Esto se ejecutará cada vez que loading cambie.

  return {
    showModal,
    handleCancel,
    showTagModal,
    handleCancelTag,
    saveTodo,
    confirmLoading,
    open,
    openTag,
    form,
    getTags,
    handleSubmit,
    initialData
  }
}

export default useCreateTodo
