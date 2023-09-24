import MainSiteNav from '@/components/layout/main-site-nav'
import { Separator } from '@/components/ui/separator'
import CanvasProvider from '@/store/canvas-provider'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="w-full min-h-screen  flex-col flex">
			<CanvasProvider>
				<MainSiteNav />
				<Separator />
				{children}
			</CanvasProvider>
		</main>
	)
}
