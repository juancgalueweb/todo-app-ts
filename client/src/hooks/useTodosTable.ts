import { Form, message } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react'
import {
  translateEngToSpaPriority,
  translateSpaToEngPriority
} from '../helpers/translatePriorities'
import type {
  ITodo,
  ITodoUpdate,
  TodoUpdateType,
  UseTodosTableReturn
} from '../interfaces/todo.interface'
import { useFilterTodos } from '../stores/filterTodosStore'
import { useTagsStore } from '../stores/tagsStore'
import { useTodosStore } from '../stores/todosStore'
import('dayjs/locale/es')
dayjs.locale('es')
dayjs.extend(relativeTime)

const useTodosTable = (): UseTodosTableReturn => {
  const { loading, removeTodo, updateCompletedStatus, updateTodo } =
    useTodosStore()
  const { filteredTodos, setFilteredTodos, pageSize, setPageSize } =
    useFilterTodos()
  const [messageApi, contextHolder] = message.useMessage()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()
  const [modaldata, setModaldata] = useState<TodoUpdateType | null>(null)
  const [open, setOpen] = useState(false)

  const getTags = useTagsStore((state) => state.getTags)

  const deleteMsg = (): void => {
    void messageApi.open({
      type: 'loading',
      content: 'Borrando tarea',
      duration: 0
    })
  }

  const completeTodoMsg = (completed: boolean): void => {
    if (completed) {
      void messageApi.open({
        type: 'success',
        content: 'Tarea completada',
        duration: 0
      })
    } else {
      void messageApi.info({
        content: 'Tarea abierta nuevamente',
        duration: 0
      })
    }
  }

  const handleSubmit = (): void => {
    form
      .validateFields()
      .then((values: ITodoUpdate) => {
        const dateToDb = dayjs(values?.deadline).toDate()
        const translatedPriority = translateSpaToEngPriority(values?.priority)
        setConfirmLoading(true)
        const dataToDB = {
          _id: modaldata?._id,
          title: values?.title,
          deadline: dateToDb,
          priority: translatedPriority,
          tags: values?.tags
        }
        updateTodo(dataToDB)
        setModaldata(null)
      })
      .catch((error) => {
        console.error('Error en el formulario:', error)
      })
  }

  const showModal = (record: ITodo): void => {
    const translatedPriority = translateEngToSpaPriority(record?.priority)
    const formattedDeadline = dayjs(record?.deadline)
    setModaldata({
      _id: record?._id,
      title: record?.title,
      priority: translatedPriority,
      deadline: formattedDeadline,
      tags: record?.tags
    })
    setOpen(true)
  }

  const handleCancel = (): void => {
    setOpen(false)
    form.resetFields()
    setModaldata(null)
  }

  useEffect(() => {
    if (modaldata) {
      const tagsToForm = modaldata.tags.map((tag) => tag._id)
      form.setFieldsValue({
        title: modaldata.title,
        priority: modaldata.priority,
        deadline: modaldata.deadline,
        tags: tagsToForm
      })
    }
  }, [modaldata])

  useEffect(() => {
    setFilteredTodos()
    if (!loading) {
      setOpen(false)
      setConfirmLoading(false)
      messageApi.destroy()
    }
  }, [loading])

  return {
    handleCancel,
    showModal,
    handleSubmit,
    completeTodoMsg,
    deleteMsg,
    getTags,
    open,
    confirmLoading,
    contextHolder,
    filteredTodos,
    removeTodo,
    updateCompletedStatus,
    loading,
    form,
    pageSize,
    setPageSize
  }
}

export default useTodosTable
