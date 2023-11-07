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
import { useTagsStore } from '../stores/tagsStore'
import { useTodosStore } from '../stores/todosStore'
import { SFlexCreateTodo } from '../styled-components/CustomAntDesignComponents'
import TagModal from './TagModal'
import TodoModal from './TodoModal'

const CreateTodo: React.FC = () => {
  const [form] = Form.useForm()
  const [openTag, setOpenTag] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const loading = useTodosStore((state) => state.loading)
  const saveTodo = useTodosStore((state) => state.saveTodo)
  const { getTags } = useTagsStore()

  const handleSubmit = (values: TodoSave): void => {
    const dateToDb = dayjs(values.deadline).toDate()
    const translatedPriority = translateSpaToEngPriority(values.priority)
    setConfirmLoading(true)
    saveTodo({
      title: values.title,
      deadline: dateToDb,
      priority: translatedPriority,
      tags: values.tags
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
          <SFlexCreateTodo justify='start' align='center'>
            <Space>
              <Button type='primary' onClick={showModal} danger>
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
        initialValues={{
          title: '',
          priority: SpaPriority.baja,
          deadline: null,
          tags: []
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
