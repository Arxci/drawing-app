import Canvas from '@/components/canvas'
import SideBar from '@/components/layout/side-bar'

export default function Home() {
	return (
		<main className=" h-[calc(100vh-61px)] min-h-[500px] flex flex-row py-5 container gap-6">
			<Canvas />
			<div className="hidden  md:flex min-w-[300px] max-w-[400px] ">
				<SideBar />
			</div>
		</main>
	)
}
