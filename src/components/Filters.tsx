import { useContext } from 'react'
import { FILTERS_BUTTONS } from '../constants/const'
import { FiltersContext } from '../contexts/FilterContext'
import {
  type FiltersContextType,
  type FilterValue
} from '../interfaces/todo.interface'

const Filters: React.FC = () => {
  const { filterSelected, filterChange } = useContext(
    FiltersContext
  ) as FiltersContextType
  return (
    <ul className='filters'>
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === filterSelected
        const className = isSelected ? 'selected' : ''

        return (
          <li key={key}>
            <a
              href={href}
              className={className}
              onClick={event => {
                event.preventDefault()
                filterChange(key as FilterValue)
              }}
            >
              {literal}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default Filters
