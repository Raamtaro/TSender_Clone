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
  // shared styles
  const baseClasses = `
    w-full
    border border-gray-300 rounded
    focus:outline-none focus:ring-2 focus:ring-blue-500
  `.trim()

  // choose size / element
  if (large) {
    return (
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-medium text-gray-700">{label}</label>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={6} // you can tweak number of rows…
          className={`${baseClasses} text-lg p-4 h-32`} 
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClasses} text-base px-3 py-2`}
      />
    </div>
  )
}

export default InputField
