/**
 * The CreateTodo component is a React functional component that renders a form
 * with an input field for creating new todo items.
 */
import { TagsOutlined } from '@ant-design/icons'
import { Button, Col, Row, Space } from 'antd'
import 'dayjs/locale/es'
import useCreateTodo from '../hooks/useCreateTodo'
import { SFlexCreateTodo } from '../styled-components/CustomAntDesignComponents'
import TagModal from './TagModal'
import TodoModal from './TodoModal'

const CreateTodo: React.FC = () => {
  const {
    showModal,
    handleCancel,
    showTagModal,
    handleCancelTag,
    getTags,
    open,
    openTag,
    form,
    confirmLoading,
    handleSubmit,
    initialData
  } = useCreateTodo()

  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <SFlexCreateTodo justify='start' align='center'>
            <Space>
              <Button
                type='primary'
                onClick={() => {
                  showModal()
                  getTags()
                }}
                danger
              >
                Crear tarea
              </Button>
              <Button
                type='default'
                icon={<TagsOutlined />}
                onClick={() => {
                  getTags()
                  showTagModal()
                }}
              >
                Gestionar etiquetas
              </Button>
            </Space>
          </SFlexCreateTodo>
        </Col>
      </Row>
      <TodoModal
        onCancel={handleCancel}
        open={open}
        onOk={form.submit}
        initialValues={initialData}
        onFinish={handleSubmit}
        form={form}
        name='saveTodo'
        modalTitle='Crear tarea'
        confirmLoading={confirmLoading}
      />
      <TagModal
        onCancelTag={handleCancelTag}
        openTagModal={openTag}
        modalTitleTag='Gestionar etiquetas'
      />
    </>
  )
}

export default CreateTodo
