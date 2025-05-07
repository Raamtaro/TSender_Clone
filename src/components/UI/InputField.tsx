// components/InputField.tsx
import React from 'react'

export interface InputFieldProps {
  label: string
  placeholder?: string
  value: string
  type?: string
  large?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = '',
  value,
  type = 'text',
  large = false,
  onChange,
}) => {
  const sizeClasses = large
    ? 'text-lg px-4 py-3'
    : 'text-base px-3 py-2'

  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          border border-gray-300 rounded 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${sizeClasses}
        `}
      />
    </div>
  )
}

export default InputField
