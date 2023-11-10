import { Form } from 'antd'
import { useEffect, useState } from 'react'
import type {
  ITag,
  TagSave,
  UseTagCreateReturn
} from '../interfaces/tags.interface'
import { useTagsStore } from '../stores/tagsStore'

const useTagCreate = (): UseTagCreateReturn => {
  const initialData: TagSave = {
    tagName: '',
    tagColor: '#232323'
  }
  const { tags, loadingTag, saveTag } = useTagsStore()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = (): void => {
    setOpen(true)
  }

  const handleCancel = (): void => {
    setOpen(false)
    form.resetFields()
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

  useEffect(() => {
    if (!loadingTag) {
      setOpen(false)
      setConfirmLoading(false)
    }
  }, [loadingTag])

  return {
    showModal,
    handleSubmit,
    handleCancel,
    tags,
    open,
    confirmLoading,
    initialData,
    form,
    loadingTag
  }
}

export default useTagCreate
