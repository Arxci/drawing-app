import { useContext } from 'react'

import CanvasContext from '@/store/canvas-context'
import { Label } from './ui/label'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

const COLORS = [
	{
		id: 0,
		colorId: '#000000',
		label: 'Black',
	},
	{
		id: 1,
		colorId: '#FFFFFF',
		label: 'White',
	},
	{
		id: 2,
		colorId: '#dc2626',
		label: 'Red',
	},
	{
		id: 3,
		colorId: '#ea580c',
		label: 'Orange',
	},
	{
		id: 4,
		colorId: '#facc15',
		label: 'Yellow',
	},
	{
		id: 5,
		colorId: '#422006',
		label: 'Brown',
	},
	{
		id: 6,
		colorId: '#65a30d',
		label: 'Green',
	},
	{
		id: 7,
		colorId: '#0284c7',
		label: 'Blue',
	},
	{
		id: 8,
		colorId: '#7c3aed',
		label: 'Purple',
	},
]

const ColorsSelector = () => {
	const canvasContext = useContext(CanvasContext)

	const updateCurrentColorHandle = (color: string) => {
		canvasContext.updateCurrentColor(color)
	}

	const updateBackgroundColorHandle = (color: string) => {
		canvasContext.updateBackgroundColor(color)
	}

	return (
		<div>
			<Label>Pen Color</Label>
			<div className="grid grid-cols-5 pt-2 gap-4">
				{COLORS.map((color) => (
					<ColorShowcase
						key={color.id}
						color={color.colorId}
						label={color.label}
						currentState={canvasContext.currentColor}
						onClick={() => updateCurrentColorHandle(color.colorId)}
					/>
				))}
			</div>
			<Label>Background Color</Label>
			<div className="grid grid-cols-5 pt-2 gap-4">
				{COLORS.map((color) => (
					<ColorShowcase
						key={color.id}
						color={color.colorId}
						label={color.label}
						currentState={canvasContext.backgroundColor}
						onClick={() => updateBackgroundColorHandle(color.colorId)}
					/>
				))}
			</div>
		</div>
	)
}

const ColorShowcase = ({
	color,
	label,
	currentState,
	onClick = () => {},
}: {
	color: string
	label: string
	currentState: string
	onClick: () => void
}) => {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						className={`border outline-none w-8 h-8 rounded-full transition-all ${
							currentState === color ? 'scale-[.7]' : undefined
						}`}
						style={{ backgroundColor: color }}
						onClick={onClick}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default ColorsSelector
