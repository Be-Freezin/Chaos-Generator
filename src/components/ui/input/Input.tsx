import React, { FC } from 'react'
import './input.css'

export interface InputProps {
	type: string | 'text' | 'number' | 'color'
	ariaLabel: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	value: string | undefined
	id: string
	name: string
	className?: string
	placeHolder?: string
	min?: string
	max?: string
	step?: string
}

export const Input: FC<InputProps> = ({
	type,
	ariaLabel,
	onChange,
	value,
	id,
	name,
	className,
	placeHolder,
	min,
	max,
	step
}) => {
	const getClassName = () => {
		let baseClass = 'input'
		if (className) {
			baseClass += ` ${className}`
		}
		if (type === 'number' || type === 'text') {
			baseClass += ' input-number'
		}
		if (type === 'color') {
			baseClass += ' input-number'
		}
		return baseClass
	}

	if (type === 'number') {
		const handleIncrement = () => {
			const newValue = (parseInt(value || '0', 10) + 1).toString()
			const event = {
				target: { value: newValue },
			} as React.ChangeEvent<HTMLInputElement>

			onChange(event)
		}

		const handleDecrement = () => {
			const newValue = (parseInt(value || '0', 10) - 1).toString()
			const event = {
				target: { value: newValue },
			} as React.ChangeEvent<HTMLInputElement>
			onChange(event)
		}

		return (
			<div className='number-input-wrapper' onChange={onChange}>
				<button className='btn' onClick={handleDecrement}>
					-
				</button>
				<input
					type='number'
					onChange={onChange}
					aria-label={ariaLabel}
					value={value}
					id={id}
					className={getClassName()}
					name={name}
					placeholder={placeHolder}
					max={max}
					min={min}
					step={step}
				/>
				<button className='btn' onClick={handleIncrement}>
					+
				</button>
			</div>
		)
	}

	return (
		<input
			className={getClassName()}
			type={type}
			aria-label={ariaLabel}
			value={value}
			id={id}
			onChange={onChange}
			name={name}
			max={max}
			min={min}
			step={step}
		/>
	)
}
