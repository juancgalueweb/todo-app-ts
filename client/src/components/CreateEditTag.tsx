import { ColorPicker, Form, Input, Modal } from 'antd'
import { recommendedColors } from '../helpers/recommendedColors'
import type { CreateEditTagModalProps } from '../interfaces/tags.interface'

const CreateEditTagModal: React.FC<CreateEditTagModalProps> = ({
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
          label='Nombre de la etiqueta'
          name='tagName'
          rules={[
            {
              required: true,
              message: 'La etiqueta debe tener un nombre'
            },
            { min: 3, message: '3 caracteres como mínimo' },
            { max: 15, message: '15 caracteres como máximo' }
          ]}
        >
          <Input placeholder='gym' allowClear />
        </Form.Item>
        <Form.Item
          label='Color de la etiqueta'
          name='tagColor'
          rules={[
            {
              required: true,
              message: 'La etiqueta debe tener un color'
            }
          ]}
        >
          <ColorPicker
            showText
            presets={[
              {
                label: 'Recomendado',
                colors: recommendedColors
              }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateEditTagModal
