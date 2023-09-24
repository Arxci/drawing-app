import { useRef, useEffect, useState } from 'react'

export const useCanvas = () => {
	const [currentColor, setCurrentColor] = useState('#000000')
	const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
	const [strokeWidth, setStrokeWidth] = useState(4)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const isDrawingRef = useRef(false)
	const previousMousePointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

	const onSetCanvasRef = (ref: HTMLCanvasElement) => {
		if (!ref) return

		canvasRef.current = ref
	}

	const onClearCanvas = () => {
		if (!canvasRef.current) return

		const canvasContext = canvasRef.current?.getContext('2d')

		if (canvasContext) {
			canvasContext.clearRect(
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			)
			onSetCurrentColor('#000000')
			onSetBackgroundColor('#FFFFFF')
		}
	}

	const onSetCurrentColor = (newColor: string) => {
		setCurrentColor(newColor)
	}

	const onSetStrokeWidth = (newWidth: number) => {
		setStrokeWidth(newWidth)
	}

	const onSetBackgroundColor = (newColor: string) => {
		setBackgroundColor(newColor)
		if (!canvasRef.current) return

		const canvasContext = canvasRef.current?.getContext('2d')

		if (canvasContext) {
			canvasContext.fillStyle = newColor
			canvasContext.fillRect(
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			)
		}
	}

	const drawHandle = (
		canvasContext: CanvasRenderingContext2D,
		mousePoint: { x: number; y: number },
		previousMousePoint: { x: number; y: number }
	) => {
		canvasContext.beginPath()
		canvasContext.lineWidth = strokeWidth
		canvasContext.strokeStyle = currentColor
		canvasContext.moveTo(previousMousePoint.x, previousMousePoint.y)
		canvasContext.lineTo(mousePoint.x, mousePoint.y)
		canvasContext.stroke()

		canvasContext.fillStyle = currentColor
		canvasContext.beginPath()
		canvasContext.arc(
			mousePoint.x,
			mousePoint.y,
			strokeWidth / 3,
			0,
			Math.PI * 2
		)
		canvasContext.fill()
	}

	const mouseMoveHandle = (event: MouseEvent) => {
		if (isDrawingRef.current) {
			const mousePoint = computePointInCanvas({
				clientX: event.clientX,
				clientY: event.clientY,
			})
			const canvasContext = canvasRef.current?.getContext('2d')
			if (canvasContext && mousePoint) {
				drawHandle(canvasContext, mousePoint, previousMousePointRef.current)
				previousMousePointRef.current = mousePoint
			}
		}
	}

	const mouseDownHandle = (event: MouseEvent) => {
		isDrawingRef.current = true

		const mousePoint = computePointInCanvas({
			clientX: event.clientX,
			clientY: event.clientY,
		})

		const canvasContext = canvasRef.current?.getContext('2d')
		if (canvasContext && mousePoint) {
			previousMousePointRef.current = mousePoint
			drawHandle(canvasContext, mousePoint, previousMousePointRef.current)
		}
	}

	const touchDownHandle = (event: TouchEvent) => {
		isDrawingRef.current = true

		const mousePoint = computePointInCanvas({
			clientX: event.touches[0].clientX,
			clientY: event.touches[0].clientY,
		})

		const canvasContext = canvasRef.current?.getContext('2d')
		if (canvasContext && mousePoint) {
			previousMousePointRef.current = mousePoint
			drawHandle(canvasContext, mousePoint, previousMousePointRef.current)
		}
	}

	const touchMoveHandle = (event: TouchEvent) => {
		if (isDrawingRef.current) {
			const mousePoint = computePointInCanvas({
				clientX: event.touches[0].clientX,
				clientY: event.touches[0].clientY,
			})
			const canvasContext = canvasRef.current?.getContext('2d')
			if (canvasContext && mousePoint) {
				drawHandle(canvasContext, mousePoint, previousMousePointRef.current)
				previousMousePointRef.current = mousePoint
			}
		}
	}

	const mouseUpHandle = () => {
		isDrawingRef.current = false
	}

	const windowResizeHandle = () => {
		if (canvasRef.current && canvasRef.current.parentElement) {
			const style = window.getComputedStyle(canvasRef.current)
			const canvasBorderWidth = style
				.getPropertyValue('border-width')
				.replace('px', '')

			canvasRef.current.width =
				canvasRef.current.parentElement.clientWidth -
				parseInt(canvasBorderWidth) * 2
			canvasRef.current.height = canvasRef.current.parentElement.clientHeight
		}
	}

	const computePointInCanvas = ({
		clientX,
		clientY,
	}: {
		clientX: number
		clientY: number
	}) => {
		if (canvasRef.current) {
			const boundingRect = canvasRef.current.getBoundingClientRect()

			return {
				x: clientX - boundingRect.left,
				y: clientY - boundingRect.top,
			}
		}
		return null
	}

	useEffect(() => {
		window.addEventListener('mousedown', mouseDownHandle)
		window.addEventListener('mousemove', mouseMoveHandle)
		window.addEventListener('mouseup', mouseUpHandle)
		window.addEventListener('touchstart', touchDownHandle)
		window.addEventListener('touchmove', touchMoveHandle)
		window.addEventListener('touchend', mouseUpHandle)
		window.addEventListener('resize', windowResizeHandle)

		return () => {
			window.removeEventListener('mousedown', mouseDownHandle)
			window.removeEventListener('mousemove', mouseMoveHandle)
			window.removeEventListener('mouseup', mouseUpHandle)
			window.removeEventListener('touchstart', touchDownHandle)
			window.removeEventListener('touchmove', touchMoveHandle)
			window.removeEventListener('touchend', mouseUpHandle)
			window.removeEventListener('resize', windowResizeHandle)
		}
	}, [currentColor, strokeWidth, backgroundColor])

	useEffect(() => {
		windowResizeHandle()
	}, [])

	return {
		onSetCanvasRef,
		onClearCanvas,
		onSetCurrentColor,
		onSetBackgroundColor,
		onSetStrokeWidth,
		canvasRef,
		strokeWidth,
		currentColor,
		backgroundColor,
	}
}
