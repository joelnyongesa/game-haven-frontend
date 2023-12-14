import React from 'react'

function Button({content, className, type='button', onClick}) {
  return (
    <button
        type={type}
       className={`
                p-3
                mx-3
                font-bold
                border
                border-platinum 
                bg-rich-black 
                hover:bg-platinum 
                hover:text-rich-black 
                rounded-lg
                ${className ? className: ''}`}
      onClick={onClick}
    >
        {content}
    </button>
  )
}

export default Button