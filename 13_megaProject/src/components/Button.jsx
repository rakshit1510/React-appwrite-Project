import React from 'react'

export default function Button({
    children,
    type="button",
    bgColor="bg-blue-600",
    textColor="tect-white",
    className="",
    ...props
    
}) {
    

    return (
        <button
        className={`${bgColor} ${textColor} ${className}`}
        {...props}
        >
            {children}
        </button>
    )
}
