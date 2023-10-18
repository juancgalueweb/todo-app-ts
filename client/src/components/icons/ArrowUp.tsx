import { type JSX } from 'react'

const ArrowUp = (): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-arrow-narrow-up'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M12 5l0 14'></path>
      <path d='M16 9l-4 -4'></path>
      <path d='M8 9l4 -4'></path>
    </svg>
  )
}

export default ArrowUp
