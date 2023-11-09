import { Form, message } from 'antd'
import { useEffect, useState } from 'react'
import type {
  ITag,
  TagEdit,
  TagSave,
  UseTagEditReturn
} from '../interfaces/tags.interface'
import { useTagsStore } from '../stores/tagsStore'

const useTagEdit = (): UseTagEditReturn => {
  const { removeTag, loadingTag, editTag } = useTagsStore()
  const [messageApi, contextHolderEdit] = message.useMessage()
  const [formEdit] = Form.useForm()
  const [openEdit, setOpenEdit] = useState(false)
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false)
  const [editTagModal, setEditTagModal] = useState<ITag | null>(null)

  const showModalEdit = (record: ITag): void => {
    setEditTagModal({
      _id: record._id,
      tagName: record.tagName,
      tagColor: record.tagColor
    })
    setOpenEdit(true)
  }

  const handleCancelEdit = (): void => {
    setOpenEdit(false)
    formEdit.resetFields()
    setEditTagModal(null)
  }

  const handleSubmitEdit = (values: TagEdit | TagSave): void => {
    setConfirmLoadingEdit(true)
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
      setOpenEdit(false)
      setConfirmLoadingEdit(false)
    }
  }, [loadingTag])

  useEffect(() => {
    if (editTagModal) {
      formEdit.setFieldsValue({
        tagName: editTagModal.tagName,
        tagColor: editTagModal.tagColor
      })
    }
  }, [editTagModal])

  return {
    showModalEdit,
    removeTag,
    deleteMsg,
    contextHolderEdit,
    handleSubmitEdit,
    handleCancelEdit,
    openEdit,
    confirmLoadingEdit,
    formEdit
  }
}

export default useTagEdit
