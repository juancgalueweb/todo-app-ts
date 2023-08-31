/**
 * Filters component that displays filter options to show all, active or completed todos
 */

import { Button } from 'antd'
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
    return Object.entries(FILTERS_BUTTONS).map(([key, { literal }]) => {
      const isSelected = key === filterSelected

      return (
        <Button
          key={key}
          type={isSelected ? 'primary' : 'default'}
          onClick={() => {
            filterChange(key as FilterValue)
          }}
          style={{ margin: '0 0.2rem' }}
        >
          {literal}
        </Button>
      )
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {renderFilterButtons()}
    </div>
  )
}

export default Filters
