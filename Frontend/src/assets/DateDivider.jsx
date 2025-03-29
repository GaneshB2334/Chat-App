
import React from 'react'

const DateDivider = ({ date }) => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="h-[1px] bg-gray-300 flex-grow"></div>
      <div className="px-4 py-1 mx-2 bg-accent text-white text-xs font-medium rounded-full">
        {date}
      </div>
      <div className="h-[1px] bg-gray-300 flex-grow"></div>
    </div>
  )
}

export default DateDivider
