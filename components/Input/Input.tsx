import React, { ChangeEventHandler, ReactElement } from 'react'
import { FieldError } from 'react-hook-form'
import { BiErrorCircle } from 'react-icons/bi'
import Icon from '../Icon/Icon'

/**
 * @component
 *
 * @param {string} cSize : container size
 */
interface InputProps {
  onBlur?: ChangeEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  name?: string
  error?: FieldError
  label?: string
  icon?: ReactElement
  type?: 'text' | 'number' | 'password' | 'email'
  defaultValue?: string
  value?: string
  cSize?: 'small' | 'normal' | 'medium' | 'large'
  placeholder?: string
  isLoading?: boolean
}

const Input = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input'] & InputProps
>(
  (
    {
      error,
      label,
      onChange,
      onBlur,
      name,
      icon,
      placeholder,
      isLoading,
      value = undefined,
      type = 'text',
      defaultValue = '',
      cSize = 'normal',
      ...leftOverProps
    },
    ref
  ) => {
    return (
      <>
        <div className="field">
          {label && <label className="label is-size-7 has-text-grey">{label}</label>}
          <div
            className={`control ${isLoading ? 'is-loading' : ''} ${
              icon ? 'has-icons-left' : ''
            }`}>
            <input
              onChange={onChange}
              ref={ref}
              onBlur={onBlur}
              name={name}
              type={type}
              placeholder={placeholder}
              autoComplete="off"
              defaultValue={defaultValue}
              value={value}
              className={`input is-${cSize}`}
              {...leftOverProps}
            />
            {icon}
          </div>
          {error && (
            <p className="help mt-2 is-danger">
              <Icon className="is-small">
                <BiErrorCircle size={16} />
              </Icon>
              <span>{error?.message}</span>
            </p>
          )}
        </div>
      </>
    )
  }
)
Input.displayName = Input.name
export default Input
