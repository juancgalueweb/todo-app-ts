import {
  Checkbox,
  DatePicker,
  Form,
  Modal,
  Row,
  Segmented,
  Space,
  Spin,
  Tag,
  Typography
} from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { SpaPriority, type TodoModalProps } from '../interfaces/todo.interface'
import { useTagsStore } from '../stores/tagsStore'

const TodoModal: React.FC<TodoModalProps> = ({
  open,
  onCancel,
  onOk,
  initialValues,
  onFinish,
  form,
  name,
  modalTitle,
  confirmLoading
}) => {
  const { tags, loadingTag } = useTagsStore()
  const { Text } = Typography
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today
    return current < dayjs().startOf('day')
  }

  const tagsOptions = tags.map((tag) => ({
    label: tag.tagName,
    value: tag._id as string,
    color: tag.tagColor
  }))

  return (
    <Modal
      open={open}
      title={modalTitle}
      onCancel={onCancel}
      onOk={onOk}
      okText={confirmLoading ? 'Guardando...' : 'Guardar'}
      confirmLoading={confirmLoading}
    >
      <Form
        name={name}
        form={form}
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
            { min: 3, message: '3 caracteres como mínimo' },
            { pattern: /^(?![0-9]+$).*/, message: 'Formato incorrecto' }
          ]}
        >
          <TextArea autoSize allowClear placeholder='¿Qué necesitas hacer?' />
        </Form.Item>
        <Form.Item label='Seleccione una etiqueta' name='tags'>
          {loadingTag ? (
            <Row gutter={[8, 8]} align='middle' justify='center'>
              <Spin />
            </Row>
          ) : tags.length === 0 ? (
            <Text type='secondary'>No hay etiquetas disponibles</Text>
          ) : (
            <Checkbox.Group style={{ width: '100%' }}>
              <Row gutter={[8, 8]}>
                {tagsOptions.map((tag) => {
                  return (
                    <Space key={tag.value}>
                      <Checkbox value={tag.value}>
                        {<Tag color={tag.color}>{tag.label}</Tag>}
                      </Checkbox>
                    </Space>
                  )
                })}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        <Form.Item
          label='Seleccione la prioridad'
          name='priority'
          rules={[
            { required: true, message: 'Debe seleccionar una prioridad' }
          ]}
        >
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
