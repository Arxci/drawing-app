'use client'

import React from 'react'

import CanvasContext, { CanvasContextProps } from '@/store/canvas-context'
import { useCanvas } from '@/hooks/use-canvas'

const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
	const {
		onSetCanvasRef,
		onClearCanvas,
		onSetCurrentColor,
		onSetBackgroundColor,
		onSetStrokeWidth,
		canvasRef,
		strokeWidth,
		currentColor,
		backgroundColor,
	} = useCanvas()

	const canvasContext: CanvasContextProps = {
		canvasRef: canvasRef,
		currentColor,
		backgroundColor,
		strokeWidth,
		setCanvasRef: onSetCanvasRef,
		updateCurrentColor: onSetCurrentColor,
		updateBackgroundColor: onSetBackgroundColor,
		updateStrokeWidth: onSetStrokeWidth,
		clearCanvas: onClearCanvas,
	}

	return (
		<CanvasContext.Provider value={canvasContext}>
			{children}
		</CanvasContext.Provider>
	)
}

export default CanvasProvider
