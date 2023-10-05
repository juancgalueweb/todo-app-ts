import { DeleteFilled, EditTwoTone } from '@ant-design/icons'
import { Modal, Popconfirm, Space, Table, Tag, Tooltip, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect } from 'react'
import type { ITag, TagModalProps } from '../interfaces/tags.interface'
import { useTagsStore } from '../stores/tagsStore'

const TagModal: React.FC<TagModalProps> = ({
  openTagModal,
  onCancelTag,
  modalTitleTag
}) => {
  const { tags, removeTag, loadingTag } = useTagsStore()
  const [messageApi, contextHolder] = message.useMessage()

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
                onClick={() => {}}
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
    }
  }, [loadingTag])

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
        <Table
          columns={columns}
          dataSource={tags}
          pagination={false}
          bordered={false}
        />
      </Modal>
    </>
  )
}

export default TagModal
