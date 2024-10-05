// context/ConfigContext.tsx
import React, { createContext, useState } from 'react'
import { LineConfig } from '../types/LineTypes'

interface LineConfigContextType {
	lineConfig: LineConfig
	setLineConfig: React.Dispatch<React.SetStateAction<LineConfig>>
}
export const LineConfigContext = createContext<
	LineConfigContextType | undefined
>(undefined)

export const ConfigContext: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [lineConfig, setLineConfig] = useState<LineConfig>({
		curve: 0.4,
		velocityCurve: Math.random() * 0.05 - 0.1,
		hue: '#eeeeee',
		colorMode: 'solid',
		numberOfLines: 100,
		width: window.innerWidth,
		height: window.innerHeight,
		shadowColor: '#000000',
		shadowOffsetX: 0,
		shadowOffsetY: 0,
		gradient: 'Linear',
		gradientColors: [
			{ offset: 0.2, color: '#FFC0CB' },
			{ offset: 0.3, color: '#800080' },
			{ offset: 0.4, color: '#00FFFF' },
			{ offset: 0.5, color: '#FFFF00' },
			{ offset: 0.6, color: '#FFA500' },
			{ offset: 0.7, color: '#FF0000' },
		],
	})

	return (
		<LineConfigContext.Provider value={{ lineConfig, setLineConfig }}>
			{children}
		</LineConfigContext.Provider>
	)
}
