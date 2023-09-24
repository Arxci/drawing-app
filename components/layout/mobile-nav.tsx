import { Menu } from 'lucide-react'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import SideBar from './side-bar'

const MobileNav = () => {
	return (
		<div className="md:hidden">
			<Sheet>
				<SheetTrigger>
					<Menu />
				</SheetTrigger>
				<SheetContent className="pt-10  max-w-none w-full">
					<SheetHeader>
						<SideBar />
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default MobileNav
