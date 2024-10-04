import React, { FC, useRef, useEffect, useContext } from 'react'
import { useLine } from '../../hooks/useLine'

import { LineConfigContext } from '../../context/ConfigContext'
import './canvas.css'

export const Canvas: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const context = useContext(LineConfigContext)

	if (!context) {
		throw new Error('Canvas must be used within the LineConfigProvider')
	}

	const { lineConfig } = context

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas) {
			const computedStyle = getComputedStyle(canvas)
			canvas.width = parseInt(computedStyle.width, 10)
			canvas.height = parseInt(computedStyle.height, 10)
		}
	}, [])

	// Call useLine after the canvas has been mounted
	useLine(canvasRef, lineConfig || {})

	return <canvas ref={canvasRef}></canvas>
}
