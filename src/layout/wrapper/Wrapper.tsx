import { useState } from 'react'
import { Canvas } from '../../components/canvas/Canvas'

import { ConfigPanel } from '../../components/configPanel/ConfigPanel'
import { LineConfigContext } from '../../context/ConfigContext'
import { LineConfig } from '../../types/LineTypes'
import './wrapper.css'

export const Wrapper = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [gradientColors] = useState<
		{ offset: number; color: string }[]
	>([
		{ offset: 0.2, color: '#FFC0CB' },
		{ offset: 0.3, color: '#800080' },
		{ offset: 0.4, color: '#00FFFF' },
		{ offset: 0.5, color: '#FFFF00' },
		{ offset: 0.6, color: '#FFA500' },
		{ offset: 0.7, color: '#FF0000' },
	])
	const [lineConfig, setLineConfig] = useState<LineConfig>({
		curve: 0.4,
		velocityCurve: Math.random() * 0.05 - 0.1,
		hue: '#eeeeee',
		gradient: 'Linear',
		gradientColors: gradientColors,
	})

	return (
		<LineConfigContext.Provider value={{ lineConfig, setLineConfig }}>
			<section className='wrapper'>
				<ConfigPanel />

				<Canvas
					// width={0}
					// height={0}
					// shadowColor=''
					// shadowOffsetX={0}
					// shadowOffsetY={0}
					// lineConfig={lineConfig}
				/>
			</section>
		</LineConfigContext.Provider>
	)
}
