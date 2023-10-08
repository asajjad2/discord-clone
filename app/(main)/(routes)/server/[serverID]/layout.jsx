import { currentProfile } from '@/lib/current-profile'
import db from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

import ServerSideBar from '@/components/server/server-sidebar'

export default async function ServerLayout({children, params}) {

    const profile = await currentProfile()
    if(!profile)
        return redirect("/")

    const server = await db.server.findUnique({
        where : {
            id : params.serverID,
            members: {
                some : {
                    profileID : profile.id
                }
            }
        }
    })  

    if(!server)
        return redirect("/")

    const channels = db.channel.findMany({
        where : {
            serverID : server.id
        }
    })

  return (
    <div className='h-full'>
        <div className='hidden md:flex flex-col h-full w-60 z-20 fixed inset-y-0'>
            <ServerSideBar serverID = {params.serverID}/>
        </div>
        <main className='h-full md:pl-60'>
            {children}
        </main>
    </div>
  )
}
