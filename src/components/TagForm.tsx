import React from 'react'

type PropsType = {
    label: String,
    removeFunction: Function,
}

function TagForm({label, removeFunction}: PropsType) {
  return (
    <div className="text-primary-700 font-medium bg-primary-100 py-1 pl-3 pr-2 mr-1 rounded group">
        <span className='capitalize'>{label}</span>
        <span className="relative -top-2 left-1 text-xs group-hover:text-red-500 font-semibold cursor-pointer group-hover:visible"
        onClick={()=>removeFunction()}>x</span>
    </div>
  )
}

export default TagForm