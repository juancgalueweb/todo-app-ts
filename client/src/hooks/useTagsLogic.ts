import { Form, message, type FormInstance } from 'antd'
import { useEffect, useState } from 'react'
import type {
  ITag,
  TagEdit,
  TagId,
  TagSave
} from '../interfaces/tags.interface'
import { useTagsStore } from '../stores/tagsStore'

interface UseTagLogicReturn {
  showModal: () => void
  showModal2: (record: ITag) => void
  removeTag: ({ _id }: TagId) => void
  deleteMsg: () => void
  contextHolder: React.ReactNode
  handleSubmit: (values: TagSave) => void
  handleSubmit2: (values: TagEdit | TagSave) => void
  handleCancel: () => void
  handleCancel2: () => void
  tags: ITag[]
  open: boolean
  open2: boolean
  confirmLoading: boolean
  confirmLoading2: boolean
  initialData: {
    tagName: string
    tagColor: string
  }
  form: FormInstance
  form2: FormInstance
}

const useTagLogic = (): UseTagLogicReturn => {
  const initialData: TagSave = {
    tagName: '',
    tagColor: '#232323'
  }
  const { tags, removeTag, loadingTag, saveTag, editTag } = useTagsStore()
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [confirmLoading2, setConfirmLoading2] = useState(false)
  const [editTagModal, setEditTagModal] = useState<ITag | null>(null)

  const showModal = (): void => {
    setOpen(true)
  }

  const showModal2 = (record: ITag): void => {
    setEditTagModal({
      _id: record._id,
      tagName: record.tagName,
      tagColor: record.tagColor
    })
    setOpen2(true)
  }

  const handleCancel = (): void => {
    setOpen(false)
    form.resetFields()
  }

  const handleCancel2 = (): void => {
    setOpen2(false)
    form2.resetFields()
    setEditTagModal(null)
  }

  const handleSubmit2 = (values: TagEdit | TagSave): void => {
    setConfirmLoading2(true)
    let colorToDb
    if (typeof values.tagColor === 'string') {
      colorToDb = values.tagColor
    } else {
      colorToDb = (values.tagColor as any).toHexString() as ITag['tagColor']
    }
    editTag({
      _id: editTagModal?._id,
      tagName: values.tagName,
      tagColor: colorToDb
    })
    setEditTagModal(null)
  }

  const handleSubmit = (values: TagSave): void => {
    setConfirmLoading(true)
    let colorToDb
    if (typeof values.tagColor === 'string') {
      colorToDb = values.tagColor
    } else {
      colorToDb = (values.tagColor as any).toHexString() as ITag['tagColor']
    }
    saveTag({
      tagName: values.tagName,
      tagColor: colorToDb
    })
    form.resetFields()
  }

  const deleteMsg = (): void => {
    void messageApi.open({
      type: 'loading',
      content: 'Borrando etiqueta',
      duration: 0
    })
  }

  useEffect(() => {
    if (!loadingTag) {
      messageApi.destroy()
      setOpen(false)
      setOpen2(false)
      setConfirmLoading(false)
      setConfirmLoading2(false)
    }
  }, [loadingTag])

  useEffect(() => {
    if (editTagModal) {
      form2.setFieldsValue({
        tagName: editTagModal.tagName,
        tagColor: editTagModal.tagColor
      })
    }
  }, [editTagModal])

  return {
    showModal,
    showModal2,
    removeTag,
    deleteMsg,
    contextHolder,
    handleSubmit,
    handleSubmit2,
    handleCancel,
    handleCancel2,
    tags,
    open,
    open2,
    confirmLoading,
    confirmLoading2,
    initialData,
    form,
    form2
  }
}

export default useTagLogic
