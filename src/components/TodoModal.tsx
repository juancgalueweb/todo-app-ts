import { DatePicker, Form, Modal, Segmented } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { SpaPriority, type TodoModalProps } from '../interfaces/todo.interface'

const TodoModal: React.FC<TodoModalProps> = ({
  open,
  onCancel,
  onOk,
  formRef,
  initialValues,
  onFinish,
  form
}) => {
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today
    return current < dayjs().startOf('day')
  }

  return (
    <Modal open={open} title='Crear tarea' onCancel={onCancel} onOk={onOk}>
      <Form
        name='saveTodo'
        form={form}
        ref={formRef}
        layout='vertical'
        initialValues={initialValues}
        onFinish={onFinish}
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
          <Segmented
            options={[SpaPriority.baja, SpaPriority.media, SpaPriority.alta]}
          />
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
            format='DD-MM-YYYY'
            disabledDate={disabledDate}
            placeholder='Fecha tope'
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TodoModal
