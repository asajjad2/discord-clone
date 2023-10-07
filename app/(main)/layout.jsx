import NavigationSideBar from "@/components/nav/navigation-sidebar"



const MainLayout = async ({children}) => {


    return (
        <div className="h-full">
            <div className="hidden md:flex w-[72px] h-full z-30 flex-col fixed inset-y-0">
                <NavigationSideBar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}            
            </main>
        </div>
    )
}

export default MainLayout