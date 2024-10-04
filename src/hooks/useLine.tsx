import { useEffect, useRef } from 'react'
import { LineConfig, Line } from '../types/LineTypes'

const createLine = (
	canvas: HTMLCanvasElement,
	lineConfig: LineConfig = {}
): Line => {
	const x = lineConfig.x ?? Math.random() * canvas.width
	const y = lineConfig.y ?? Math.random() * canvas.height
	const history = lineConfig.history ?? [{ x, y }]
	const lineWidth = lineConfig.lineWidth ?? Math.floor(Math.random() * 10 + 1)
	const numberOfLines = lineConfig.numberOfLines ?? 100
	const hue =
		lineConfig.hue ?? `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
	const maxLength = lineConfig.maxLength ?? Math.floor(Math.random() * 150 + 10)
	const speedX = lineConfig.speedX ?? Math.floor(Math.random() * 5 - 0.5)
	const speedY = lineConfig.speedY ?? 5
	const lifeSpan =
		lineConfig.lifeSpan ?? Math.floor(Math.random() * 150 + 10) * 2
	const breakPoint = lineConfig.breakPoint ?? lifeSpan * 0.85
	const timer = lineConfig.timer ?? 0
	const angle = lineConfig.angle ?? 0
	const velocityAngle = lineConfig.velocityAngle ?? Math.random() * 7.5 - 0.25
	const curve = lineConfig.curve ?? 0.4
	const velocityCurve = lineConfig.velocityCurve ?? Math.random() * 0.05 - 0.1
	const gradient = lineConfig.gradient
	const gradientColors = lineConfig.gradientColors ?? []

	return {
		x,
		y,
		history,
		lineWidth,
		numberOfLines,
		hue,
		maxLength,
		speedX,
		speedY,
		lifeSpan,
		breakPoint,
		timer,
		angle,
		velocityAngle,
		curve,
		velocityCurve,
		gradient,
		gradientColors,
	}
}

const drawLine = (
	context: CanvasRenderingContext2D,
	line: Line,
	canvas: HTMLCanvasElement,
	lineConfig: LineConfig
) => {
	context.beginPath()
	context.moveTo(line.history[0].x, line.history[0].y)
	for (let i = 0; i < line.history.length; i++) {
		context.lineTo(line.history[i].x, line.history[i].y)
	}

	if (
		lineConfig.colorMode === 'gradient' &&
		lineConfig.gradientColors.length > 0
	) {
		let gradient: CanvasGradient

		if (lineConfig.gradientType === 'linear') {
			gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
		} else {
			gradient = context.createRadialGradient(
				canvas.width * 0.5,
				canvas.height * 0.5,
				0,
				canvas.width * 0.5,
				canvas.height * 0.5,
				Math.max(canvas.width, canvas.height) * 0.5
			)
		}

		lineConfig.gradientColors.forEach((colorStop) => {
			gradient.addColorStop(colorStop.offset, colorStop.color)
		})

		context.strokeStyle = gradient
	} else {
		context.strokeStyle = lineConfig.hue
	}

	context.lineWidth = line.lineWidth
	context.stroke()
}

const updateLine = (
	line: Line,
	canvas: HTMLCanvasElement,
	lineConfig: LineConfig
) => {
	line.timer++
	line.angle += line.velocityAngle
	line.curve += line.velocityCurve
	line.hue = lineConfig.hue ?? line.hue
	if (line.timer < line.lifeSpan) {
		if (line.timer > line.breakPoint) {
			line.velocityAngle *= -1.12
		}
		line.x += Math.sin(line.angle) * line.curve
		line.y += Math.cos(line.angle) * line.curve
		line.history.push({ x: line.x, y: line.y })
		if (line.history.length > line.maxLength) {
			line.history.shift()
		}
	} else if (line.history.length <= 1) {
		resetLine(line, canvas, lineConfig)
	} else {
		line.history.shift()
	}
}

const resetLine = (
	line: Line,
	canvas: HTMLCanvasElement,
	lineConfig: LineConfig = {}
) => {
	line.x = lineConfig.x ?? Math.random() * canvas.width
	line.y = lineConfig.y ?? Math.random() * canvas.height
	line.history = lineConfig.history ?? [{ x: line.x, y: line.y }]
	line.timer = lineConfig.timer ?? 0
	line.angle = lineConfig.angle ?? 0
	line.curve = lineConfig.curve ?? 0
	line.velocityAngle = lineConfig.velocityAngle ?? Math.random() * 0.5 - 0.25
}

export const useLine = (
	canvasRef: React.RefObject<HTMLCanvasElement>,
	lineConfig: LineConfig
) => {
	const linesArray = useRef<Line[]>([])
	const animationFrameId = useRef<number | null>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Initialize lines
		linesArray.current = []
		const numberOfLines = lineConfig.numberOfLines ?? 100
		for (let i = 0; i < numberOfLines; i++) {
			linesArray.current.push(createLine(canvas, lineConfig))
		}

		// Start animation
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			linesArray.current.forEach((line) => {
				drawLine(ctx, line, canvas, lineConfig)
				updateLine(line, canvas, lineConfig)
			})
			animationFrameId.current = requestAnimationFrame(animate)
		}
		animate()

		return () => {
			if (animationFrameId.current !== null) {
				cancelAnimationFrame(animationFrameId.current)
			}
		}
	}, [
		canvasRef,
		lineConfig,
		lineConfig.numberOfLines,
		lineConfig.hue,
		lineConfig.gradientType,
		lineConfig.gradientColors,
		lineConfig.colorMode,
	])
}
