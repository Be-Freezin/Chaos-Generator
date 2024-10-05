// types/LineTypes.ts
export interface GradientColor {
	offset: number
	color: string
}

export interface LineConfig {
	x?: number
	y?: number
	history?: { x: number; y: number }[]
	lineWidth?: number
	numberOfLines?: number
	hue?: string
	colorMode?: 'solid' | 'gradient'
	maxLength?: number
	speedX?: number
	speedY?: number
	lifeSpan?: number
	breakPoint?: number
	timer?: number
	angle?: number
	velocityAngle?: number
	curve?: number
	velocityCurve?: number
	strokeStyle?: string
	gradient?: 'Linear' | 'Radial'
	gradientColors?: GradientColor[]
	shadowColor?: string
	shadowOffsetX?: number
	shadowOffsetY?: number
	width?: number
	height?: number
}

export interface Line {
	x: number
	y: number
	history: { x: number; y: number }[]
	lineWidth: number
	hue: string
	maxLength: number
	numberOfLines: number
	speedX: number
	speedY: number
	lifeSpan: number
	breakPoint: number
	timer: number
	angle: number
	velocityAngle: number
	curve: number
	velocityCurve: number
	gradient: 'Linear' | 'Radial'
	gradientColors: GradientColor[]
	shadowColor: string
	shadowOffsetX: number
	shadowOffsetY: number
	width: number
	height: number
}
