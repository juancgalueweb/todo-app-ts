import { Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import useTagCreate from '../hooks/useTagsCreate'
import useTagEdit from '../hooks/useTagsEdit'
import type { ITag, TagModalProps } from '../interfaces/tags.interface'
import {
  SButtonCreateTag,
  SDeleteFilledIcon,
  SEditTwoToneIcon,
  SModalTag,
  SSpaceFlex
} from '../styled-components/CustomAntDesignComponents'
import CreateEditTagModal from './CreateEditTag'

const TagModal: React.FC<TagModalProps> = ({
  openTagModal,
  onCancelTag,
  modalTitleTag
}) => {
  const {
    showModal,
    handleSubmit,
    handleCancel,
    tags,
    open,
    confirmLoading,
    initialData,
    form,
    loadingTag
  } = useTagCreate()

  const {
    showModalEdit,
    removeTag,
    deleteMsg,
    contextHolderEdit,
    handleSubmitEdit,
    handleCancelEdit,
    openEdit,
    confirmLoadingEdit,
    formEdit
  } = useTagEdit()

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
              <SEditTwoToneIcon
                rev={''}
                onClick={() => {
                  showModalEdit(record)
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
                <SDeleteFilledIcon rev={''} />
              </Tooltip>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  return (
    <>
      {contextHolderEdit}
      <SModalTag
        open={openTagModal}
        title={modalTitleTag}
        onCancel={onCancelTag}
        footer={null}
      >
        {tags.length === 0 && <p>Aún no ha creado ninguna etiqueta 😓</p>}
        <SSpaceFlex direction='vertical' size='large'>
          <SButtonCreateTag type='primary' onClick={showModal}>
            Crear etiqueta
          </SButtonCreateTag>
          <Table
            columns={columns}
            dataSource={tags}
            pagination={false}
            bordered={false}
            rowKey={(record) => record._id ?? ''}
            loading={loadingTag}
          />
        </SSpaceFlex>
      </SModalTag>
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
        open={openEdit}
        onCancel={handleCancelEdit}
        onOk={formEdit.submit}
        onFinish={handleSubmitEdit}
        form={formEdit}
        name='editTag'
        modalTitle='Editar etiqueta'
        confirmLoading={confirmLoadingEdit}
      />
    </>
  )
}

export default TagModal
