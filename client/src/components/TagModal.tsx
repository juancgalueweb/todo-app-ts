import { Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import useTagLogic from '../hooks/useTagsLogic'
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
  } = useTagLogic()
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
      {contextHolder}
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
        open={open2}
        onCancel={handleCancel2}
        onOk={form2.submit}
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
