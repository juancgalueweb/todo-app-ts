/**
 * The CreateTodo component is a React functional component that renders a form
 * with an input field for creating new todo items.
 */
import { Button, Col, DatePicker, Form, Modal, Row, Segmented } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import locale from 'antd/es/date-picker/locale/es_ES'
import type { FormInstance } from 'antd/es/form'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useContext, useRef, useState } from 'react'
import { TodosContext } from '../contexts/TodoContext'
import type { TodoContextType, TodoSave } from '../interfaces/todo.interface'

const CreateTodo: React.FC = () => {
  const [form] = Form.useForm()
  const formRef = useRef<FormInstance>(null)
  const { saveTodo } = useContext(TodosContext) as TodoContextType
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: TodoSave): void => {
    const dateToDb = dayjs(values.deadline).toDate()
    saveTodo({ ...values, deadline: dateToDb })
    setOpen(false)
    formRef.current?.resetFields()
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current < dayjs().startOf('day')
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
      <Modal
        open={open}
        title='Crear tarea'
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          name='saveTodo'
          form={form}
          ref={formRef}
          layout='vertical'
          initialValues={{
            title: '',
            priority: 'baja',
            deadline: null
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label='Describe la tarea pendiente'
            name='title'
            rules={[
              {
                required: true,
                message: 'La tarea no puede ser un texto vacío'
              },
              { min: 3, message: '3 caracteres como mínimo' }
            ]}
          >
            <TextArea autoSize allowClear placeholder='¿Qué necesitas hacer?' />
          </Form.Item>
          <Form.Item label='Seleccione la prioridad' name='priority' required>
            <Segmented options={['baja', 'normal', 'alta']} />
          </Form.Item>
          <Form.Item
            label='Seleccione la fecha tope'
            name='deadline'
            rules={[
              {
                type: 'date',
                required: true,
                message: 'Debe seleccionar una fecha'
              }
            ]}
          >
            <DatePicker
              locale={locale}
              format='DD-MM-YYYY'
              disabledDate={disabledDate}
              placeholder='Fecha tope'
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateTodo
