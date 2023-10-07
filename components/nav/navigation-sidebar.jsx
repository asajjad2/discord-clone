import { currentProfile } from "@/lib/current-profile"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

import NavigationAction from "./navigation-action"
import NavigationItem from "./navigation-item"
import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"



export default async function NavigationSideBar() {

    const profile = await currentProfile()
    if(!profile) {
        return redirect('/')
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileID: currentProfile.id
                }
            }
        }
    })

    // console.log("servers:",servers)


  return (
    <div className='space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3'>
        <NavigationAction />
        <Separator 
            className='h-[2px] w-10 bg-zinc-300 dark:bg-zinc-700 rounded mx-auto'
        />
        <ScrollArea className='flex-1 w-full'>
            {servers.map(server => (
                <div key={server.id} className='mb-4'>
                    <NavigationItem id={server.id} name={server.name} imgURL={server.imgURL}/>
                </div>
            ))}
        </ScrollArea>
        <div className="pb-3 mt-auto flex flex-col items-center gap-y-4">
            <ModeToggle />
            <UserButton 
                afterSignOutUrl="/"
                appearance={{
                    elements : {
                        avatarBox : "h-12 w-12"
                    }
                }}
            />
        </div>
    </div>
  )
}
