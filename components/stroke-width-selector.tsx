import { useContext } from 'react'

import CanvasContext from '@/store/canvas-context'

import { Label } from './ui/label'
import { Slider } from './ui/slider'

const StrokeWidthSelector = () => {
	const canvasContext = useContext(CanvasContext)

	const sliderChangeHandle = (newValues: number[]) => {
		const newValue = newValues[0]
		if (newValue) {
			canvasContext.updateStrokeWidth(newValue)
		}
	}

	return (
		<div>
			<Label>Stoke Width</Label>
			<div className="flex flex-row gap-4">
				<Slider
					defaultValue={[canvasContext.strokeWidth]}
					max={10}
					step={0.1}
					onValueChange={sliderChangeHandle}
				/>
				<p className="w-[10px]">{canvasContext.strokeWidth}</p>
			</div>
		</div>
	)
}

export default StrokeWidthSelector
