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
	min?: number
	max?: number
	step?: number
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
	step,
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
			const currentValue = parseFloat(value || '0')
			const incrementStep = step !== undefined ? step : 1
			const maxValue = max !== undefined ? max : Infinity
			// const minValue = min !== undefined ? min : 0

			const newValue = Math.min(currentValue + incrementStep, maxValue).toFixed(1)
			const event = {
				target: { value: newValue.toString() },
			} as React.ChangeEvent<HTMLInputElement>

			onChange(event)
		}

		const handleDecrement = () => {
			const currentValue = parseFloat(value || '0')
			const decrementStep = step !== undefined ? step : 1
			const minValue = min !== undefined ? min : 0
			const newValue = Math.max(currentValue - decrementStep, minValue).toFixed(1)
			const event = {
				target: { value: newValue.toString() },
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
			max={max?.toString()}
			min={min?.toString()}
			step={step?.toString()}
		/>
	)
}
