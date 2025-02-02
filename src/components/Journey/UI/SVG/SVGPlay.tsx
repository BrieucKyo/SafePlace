const SVGPlay = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`text-white transform-gpu scale-150 ${className}`}
      width='10'
      height='12'
      viewBox='0 0 15 15'
      fill='none'
    >
      <path
        d='M14 7.5L3.5 13.9952L3.5 1.00481L14 7.5Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  )
}

export default SVGPlay
