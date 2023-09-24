'use client'

import { useContext } from 'react'

import CanvasContext from '@/store/canvas-context'
import { Button } from '../ui/button'
import ColorsSelector from '../colors-selector'
import StrokeWidthSelector from '../stroke-width-selector'

const SideBar = () => {
	const canvasContext = useContext(CanvasContext)

	return (
		<div className="h-full w-full flex-col gap-4 ">
			<Button
				className="w-full"
				onClick={canvasContext.clearCanvas}
			>
				Clear
			</Button>
			<ColorsSelector />
			<StrokeWidthSelector />
		</div>
	)
}

export default SideBar
