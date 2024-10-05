import { FC } from 'react'
import './button.module.css'

interface ButtonProps {
  handleClick: (value?: any) => void
  children: string
  ariaLabel: string


}

export const Button: FC<ButtonProps> = ({
  handleClick,
  children,
  ariaLabel
}) => {
	return <button onClick={handleClick} aria-label={ariaLabel}>{children}</button>
}
