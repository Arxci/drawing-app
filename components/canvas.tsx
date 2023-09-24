'use client'

import { useContext } from 'react'

import CanvasContext from '@/store/canvas-context'
import { Card } from './ui/card'

const Canvas = () => {
	const canvasContext = useContext(CanvasContext)

	return (
		<Card className="h-full flex-1 col-span-4 overflow-hidden">
			<canvas
				ref={canvasContext.setCanvasRef}
				className="h-full w-full "
			/>
		</Card>
	)
}

export default Canvas
