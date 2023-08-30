/**
 * The CreateTodo component is a React functional component that renders a form
 * with an input field for creating new todo items.
 */
import { Button, Col, Form, Row } from 'antd'
import type { FormInstance } from 'antd/es/form'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useContext, useRef, useState } from 'react'
import { TodosContext } from '../contexts/TodoContext'
import { translateSpaToEngPriority } from '../helpers/translatePriorities'
import {
  SpaPriority,
  type TodoContextType,
  type TodoSave
} from '../interfaces/todo.interface'
import TodoModal from './TodoModal'

const CreateTodo: React.FC = () => {
  const [form] = Form.useForm()
  const formRef = useRef<FormInstance | null>(null)
  const { saveTodo } = useContext(TodosContext) as TodoContextType
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: TodoSave): void => {
    const dateToDb = dayjs(values.deadline).toDate()
    const translatedPriority = translateSpaToEngPriority(values.priority)
    saveTodo({
      title: values.title,
      deadline: dateToDb,
      priority: translatedPriority
    })
    setOpen(false)
    formRef.current?.resetFields()
  }

  const showModal = (): void => {
    setOpen(true)
  }

  const handleCancel = (): void => {
    setOpen(false)
    formRef.current?.resetFields()
  }

  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <div className='create-task-button'>
            <Button type='primary' onClick={showModal} danger>
              Crear tarea
            </Button>
          </div>
        </Col>
      </Row>
      <TodoModal
        onCancel={handleCancel}
        open={open}
        onOk={form.submit}
        formRef={formRef}
        initialValues={{
          title: '',
          priority: SpaPriority.baja,
          deadline: null
        }}
        onFinish={handleSubmit}
        form={form}
      />
    </>
  )
}

export default CreateTodo
