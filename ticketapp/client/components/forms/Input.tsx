import React from 'react'

interface Props {
  inputId: string
  inputName: string
  labelText: string
  value: string
  type: string
  onChange: React.ChangeEventHandler
  errorMessage: string | undefined
}

const Input = ({
  inputId,
  inputName,
  labelText,
  value,
  onChange,
  errorMessage,
  type
}: Props) => {
  return (
    <div className='form-group m-2'>
      <label htmlFor={inputId}>{labelText}</label>
      <input
        className='form-control'
        id={inputId}
        name={inputName}
        value={value}
        onChange={onChange}
        type={type}
      />
      <span className='text-danger'>{errorMessage}</span>
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default Input
