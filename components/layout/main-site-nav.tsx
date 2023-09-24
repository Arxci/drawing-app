import MobileNav from './mobile-nav'

const MainSiteNav = () => {
	return (
		<nav className="container flex  justify-between h-[60px] flex-row items-center ">
			<h2 className="text-lg font-semibold">Playground</h2>
			<MobileNav />
		</nav>
	)
}

export default MainSiteNav
