/**
 * The CreateTodo component is a React functional component that renders a form
 * with an input field for creating new todo items.
 */
import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import locale from 'antd/es/date-picker/locale/es_ES'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useContext, useState } from 'react'
import { TodosContext } from '../contexts/TodoContext'
import type { TodoContextType } from '../interfaces/todo.interface'

const CreateTodo: React.FC = () => {
  const { saveTodo } = useContext(TodosContext) as TodoContextType
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current < dayjs().endOf('day')
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    // console.log(date?.format(), '/', date?.toISOString(), '/', new Date())
    if (date == null) return
    const date2 = date?.toDate()
    const date1 = new Date()
    const millisecondsPerDay = 24 * 60 * 60 * 1000 // Cantidad de milisegundos en un día
    const timeDifferenceInMilliseconds = date2.getTime() - date1.getTime()
    console.log('time difference', timeDifferenceInMilliseconds)
    console.log('ms per day', millisecondsPerDay)
    const differenceInDays = timeDifferenceInMilliseconds / millisecondsPerDay

    console.log('La diferencia en días entre las fechas es:', differenceInDays)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='new-todo'
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
        }}
        placeholder='¿Qué necesitas hacer?'
      />
      <DatePicker
        onChange={onChange}
        locale={locale}
        format='DD-MM-YYYY'
        disabledDate={disabledDate}
      />
    </form>
  )
}

export default CreateTodo
