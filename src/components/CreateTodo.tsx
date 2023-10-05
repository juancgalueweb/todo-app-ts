/**
 * The CreateTodo component is a React functional component that renders a form
 * with an input field for creating new todo items.
 */
import { TagsOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Space } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useEffect, useState } from 'react'
import { translateSpaToEngPriority } from '../helpers/translatePriorities'
import { SpaPriority, type TodoSave } from '../interfaces/todo.interface'
import { useTodosStore } from '../stores/todosStore'
import TagModal from './TagModal'
import TodoModal from './TodoModal'

const CreateTodo: React.FC = () => {
  const [form] = Form.useForm()
  const [openTag, setOpenTag] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const loading = useTodosStore((state) => state.loading)
  const saveTodo = useTodosStore((state) => state.saveTodo)

  const handleSubmit = (values: TodoSave): void => {
    const dateToDb = dayjs(values.deadline).toDate()
    const translatedPriority = translateSpaToEngPriority(values.priority)
    setConfirmLoading(true)
    saveTodo({
      title: values.title,
      deadline: dateToDb,
      priority: translatedPriority
    })
    form.resetFields()
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

  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <div className='create-task-button'>
            <Space wrap>
              <Button type='primary' onClick={showModal} danger>
                Crear tarea
              </Button>
              <Button
                type='default'
                icon={<TagsOutlined />}
                onClick={showTagModal}
              >
                Gestionar etiquetas
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      <TodoModal
        onCancel={handleCancel}
        open={open}
        onOk={form.submit}
        initialValues={{
          title: '',
          priority: SpaPriority.baja,
          deadline: null
        }}
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
