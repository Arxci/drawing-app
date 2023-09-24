import { MutableRefObject, createContext } from 'react'

export interface CanvasContextProps {
	canvasRef: MutableRefObject<HTMLCanvasElement | null> | null
	currentColor: string
	backgroundColor: string
	strokeWidth: number
	setCanvasRef: (ref: HTMLCanvasElement) => void
	updateCurrentColor: (newColor: string) => void
	updateBackgroundColor: (newColor: string) => void
	updateStrokeWidth: (newWidth: number) => void
	clearCanvas: () => void
}

const CanvasContext = createContext<CanvasContextProps>({
	canvasRef: null,
	currentColor: '',
	backgroundColor: '',
	strokeWidth: 0,
	setCanvasRef: () => {},
	updateCurrentColor: () => {},
	updateBackgroundColor: () => {},
	updateStrokeWidth: () => {},
	clearCanvas: () => {},
})

export default CanvasContext
