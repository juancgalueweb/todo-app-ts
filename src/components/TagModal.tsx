import { DeleteFilled, EditTwoTone } from '@ant-design/icons'
import {
  Button,
  Form,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
  message
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import type {
  ITag,
  TagEdit,
  TagModalProps,
  TagSave
} from '../interfaces/tags.interface'
import { useTagsStore } from '../stores/tagsStore'
import CreateEditTagModal from './CreateEditTag'

const TagModal: React.FC<TagModalProps> = ({
  openTagModal,
  onCancelTag,
  modalTitleTag
}) => {
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

  const columns: ColumnsType<ITag> = [
    {
      title: 'Etiqueta',
      dataIndex: 'tagName',
      render: (record, row) => <Tag color={row.tagColor}>{record}</Tag>
    },
    {
      title: 'Acciones',
      width: '15%',
      render: (record) => {
        return (
          <Space size='small'>
            <Tooltip title='Editar etiqueta'>
              <EditTwoTone
                rev={''}
                style={{ color: '#0EA5E9', fontSize: 16 }}
                onClick={() => {
                  showModal2(record)
                }}
              />
            </Tooltip>
            <Popconfirm
              title='¿Desea eliminar la etiqueta?'
              onConfirm={() => {
                removeTag({ _id: record._id })
                deleteMsg()
              }}
            >
              <Tooltip title='Borrar etiqueta'>
                <DeleteFilled
                  rev={''}
                  style={{ color: '#E63F32', fontSize: 16 }}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

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

  return (
    <>
      {contextHolder}
      <Modal
        open={openTagModal}
        title={modalTitleTag}
        onCancel={onCancelTag}
        footer={null}
      >
        {tags.length === 0 && <p>Aún no ha creado ninguna etiqueta 😓</p>}
        <Space direction='vertical' size='large' style={{ display: 'flex' }}>
          <Button
            type='primary'
            style={{ marginTop: '10px' }}
            onClick={showModal}
          >
            Crear etiqueta
          </Button>
          <Table
            columns={columns}
            dataSource={tags}
            pagination={false}
            bordered={false}
          />
        </Space>
      </Modal>
      <CreateEditTagModal
        open={open}
        onCancel={handleCancel}
        onOk={form.submit}
        initialValues={initialData}
        onFinish={handleSubmit}
        form={form}
        name='saveTag'
        modalTitle='Crear etiqueta'
        confirmLoading={confirmLoading}
      />
      <CreateEditTagModal
        open={open2}
        onCancel={handleCancel2}
        onOk={form2.submit}
        initialValues={{
          _id: editTagModal?._id,
          tagName: editTagModal?.tagName,
          tagColor: editTagModal?.tagColor
        }}
        onFinish={handleSubmit2}
        form={form2}
        name='editTag'
        modalTitle='Editar etiqueta'
        confirmLoading={confirmLoading2}
      />
    </>
  )
}

export default TagModal
