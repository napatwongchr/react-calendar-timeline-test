import React from 'react'

function FilterIcon({ className, width, height, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 19.299 12.307"
      {...rest}
    >
      <g transform="translate(16995.299 1154)">
        <path
          stroke="#000"
          strokeWidth="0.7"
          d="M5.185 8.265h5.53a.346.346 0 110 .691h-5.53a.346.346 0 110-.691zM2.419 4.118H13.48a.346.346 0 110 .691H2.419a.346.346 0 010-.691zM.346 0h15.208a.346.346 0 010 .691H.346a.346.346 0 010-.691z"
          transform="translate(-16995.449 -1156.5) translate(.5 5.5)"
        />
        <circle
          cx="3"
          cy="3"
          r="3"
          fill="#004eff"
          transform="translate(-16982 -1154)"
        />
      </g>
    </svg>
  )
}

export default FilterIcon
