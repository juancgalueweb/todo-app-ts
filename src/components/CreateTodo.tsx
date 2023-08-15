/**
 * The CreateTodo component is a React functional component that renders a form
 * with an input field for creating new todo items.
 */
import type { DatePickerProps } from 'antd'
import { Button, Col, DatePicker, Divider, Modal, Row, Segmented } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import locale from 'antd/es/date-picker/locale/es_ES'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useContext, useState } from 'react'
import { TodosContext } from '../contexts/TodoContext'
import { differenceInDaysFunc } from '../helpers/daysDifference'
import type { TodoContextType } from '../interfaces/todo.interface'

const CreateTodo: React.FC = () => {
  const { saveTodo } = useContext(TodosContext) as TodoContextType
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState<string | number>('Baja')
  const [deadline, setDeadline] = useState<string | Date>('')

  const handleSubmit = (): void => {
    setOpen(false)
    const toClg = { title: inputValue, priority, deadline }
    saveTodo({ title: inputValue, priority, deadline })
    console.log('Lo que va a procesar el saveTodo', toClg)
    setInputValue('')
    setDeadline('') //! Revisar
    setPriority('') //! Revisar
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current < dayjs().endOf('day')
  }

  const onChange: DatePickerProps['onChange'] = (date) => {
    if (date == null) return
    const deadlineDate = date?.toDate()
    setDeadline(deadlineDate)
    const currentDate = new Date()
    const differenceInDays = differenceInDaysFunc(deadlineDate, currentDate)
    console.log('La diferencia en días entre las fechas es:', differenceInDays)
  }

  const showModal = (): void => {
    setOpen(true)
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
        onCancel={() => {
          setOpen(false)
        }}
        onOk={handleSubmit}
      >
        <form onSubmit={handleSubmit}>
          <Divider orientation='left'>Escriba su tarea</Divider>
          <TextArea
            autoSize
            allowClear
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
            }}
            placeholder='¿Qué necesitas hacer?'
          />
          <Divider orientation='left'>Seleccione la prioridad</Divider>
          <Segmented
            options={['Baja', 'Normal', 'Alta']}
            value={priority}
            onChange={setPriority}
          />
          <Divider orientation='left'>Indique la fecha tope</Divider>
          <DatePicker
            onChange={onChange}
            locale={locale}
            format='DD-MM-YYYY'
            disabledDate={disabledDate}
          />
        </form>
      </Modal>
    </>
  )
}

export default CreateTodo
