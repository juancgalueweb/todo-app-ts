/**
 * Filters component that displays filter options to show all, active or completed todos
 */

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

  /**
   * Renders the filter buttons based on the FILTERS_BUTTONS constant
   * @returns {JSX.Element[]} An array of JSX elements representing the filter buttons
   */
  const renderFilterButtons = (): JSX.Element[] => {
    return Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
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
    })
  }

  return <ul className='filters'>{renderFilterButtons()}</ul>
}

export default Filters
