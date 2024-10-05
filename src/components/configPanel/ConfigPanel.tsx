import React, { FC, useContext } from 'react'
import './ConfigPanel.css'
import { Button } from '../ui/button/Button'
import { Fieldset } from '../ui/fieldset/Fieldset'
import { Input } from '../ui/input/Input'
import { LineConfigContext } from '../../context/ConfigContext'

export const ConfigPanel: FC = () => {
	const context = useContext(LineConfigContext)

	if (!context) {
		throw new Error('ConfigPanel must be used within the LineConfigProvider')
	}

	const { lineConfig, setLineConfig } = context

	const handleLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLineConfig((prevConfig) => ({
			...prevConfig,
			numberOfLines: Number(e.target.value),
		}))
	}
	// const handleLineSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
	// 	e.preventDefault()
	// 	setLineConfig((prevConfig) => ({
	// 		...prevConfig,
	// 		numberOfLines: Number(e.target.value),
	// 	}))
	// }

	const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLineConfig((prevConfig) => ({
			...prevConfig,
			hue: e.target.value,
		}))
	}

	const handleGradientTypeChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setLineConfig((prevConfig) => ({
			...prevConfig,
			gradient: e.target.value as 'Linear' | 'Radial',
		}))
	}

	const handleGradientChange = (index: number, color: string) => {
		const newGradientColors = [...(lineConfig.gradientColors || [])]
		newGradientColors[index] = { ...newGradientColors[index], color }
		setLineConfig((prevConfig) => ({
			...prevConfig,
			gradientColors: newGradientColors,
		}))
	}

	const addGradientColor = () => {
		setLineConfig((prevConfig) => ({
			...prevConfig,
			gradientColors: [
				...(prevConfig.gradientColors ?? []),
				{ offset: 0.5, color: '#EEEEEE' },
			],
		}))
	}

	const handleColorModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const colorMode = e.target.value as 'solid' | 'gradient'
		setLineConfig((prevConfig) => ({
			...prevConfig,
			colorMode,
		}))
	}

	// const handleHueSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
	// 	e.preventDefault()
	// 	setLineConfig((prevConfig) => ({
	// 		...prevConfig,
	// 		hue: e.target.value,
	// 	}))
	// }

	// const handleGradientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setLineConfig((prevConfig) => ({
	// 		...prevConfig,
	// 		gradientColors: e.target.value,
	// 		strokeStyle: 'gradient',
	// 	}))
	// }

	console.log(lineConfig)
	return (
		<section>
			<Fieldset
				legendTitle='Lines'
				children={
					<>
						<Input
							type='number'
							value={lineConfig.numberOfLines?.toString() || '100'}
							onChange={handleLineChange}
							name='number-of-lines'
							id='number-of-lines'
							ariaLabel='Number of Lines Input'
							className='number-input'
							placeHolder='100'
						/>
					</>
				}
			/>

			<Fieldset
				legendTitle='Color'
				children={
					<div className='color-wrapper'>
						<div className='color-container'>
							<div className='color-mode-container'>
								<label className='color-mode-label'>
									Color Mode:
									<select
										value={lineConfig.colorMode}
										onChange={handleColorModeChange}
									>
										<option value='solid'>Solid Color</option>
										<option value='gradient'>Gradient</option>
									</select>
								</label>
							</div>
							<div className='gradient-type-container'>
								<label>
									Gradient Type:
									<select
										value={lineConfig.gradient}
										onChange={handleGradientTypeChange}
									>
										<option value='Linear'>Linear</option>
										<option value='Radial'>Radial</option>
									</select>
								</label>
							</div>
						</div>
						<div className='single-color-container'>
							<h3>Single Color</h3>
							<Input
								type='color'
								value={lineConfig.hue || '#EEEEEE'}
								onChange={handleHueChange}
								name='hue'
								id='hue'
								ariaLabel='Color Picker'
								className='color-input'
							/>
						</div>
						<h3>Gradient Options</h3>
						{(lineConfig.gradientColors ?? []).map((gradientColor, index) => (
							<div key={index} className='gradient-container'>
								<div className='gradient-offset-container'>
									<label>Offset:</label>
									<Input
										ariaLabel='Gradient Offset Value'
										id='gradient-offset'
										name='gradient-offset'
										type='number'
										className='number-input'
										step='0.1'
										value={gradientColor.offset?.toString() || '0.5'}
										onChange={(e) => {
											const newOffset = parseFloat(e.target.value)
											const newGradientColors = [
												...(lineConfig.gradientColors ?? []),
											]
											newGradientColors[index] = {
												...newGradientColors[index],
												offset: newOffset,
											}
											setLineConfig((prevConfig) => ({
												...prevConfig,
												gradientColors: newGradientColors,
											}))
										}}
									/>
								</div>
								<div className='gradient-color-container'>
									<label>Color:</label>
									<Input
										className='color-input'
										ariaLabel='Gradient Color Picker'
										id='gradient-color'
										name='gradient-color'
										type='color'
										value={gradientColor.color}
										onChange={(e) =>
											handleGradientChange(index, e.target.value)
										}
									/>
								</div>
							</div>
						))}
						<Button
							handleClick={addGradientColor}
							ariaLabel='Add gradient color'
						>
							Add Gradient Color
						</Button>
					</div>
				}
			/>
		</section>
	)
}
