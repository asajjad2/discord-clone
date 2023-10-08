import React from 'react'
import { currentProfile } from '@/lib/current-profile';
import db from '@/lib/db';
import redirect from 'next/navigation';
import ServerHeader from './server-header';
import { ChannelType } from '@prisma/client';

export default async function ServerSidebar({serverID}) {

    const profile = await currentProfile();
    if(!profile)
        return redirect("/")

    // need to import server data again over here because in mobile view, the server sidebar is not rendered

    const server = await db.server.findUnique({
        where : {
            id : serverID,
        },
        include : {
            channels : {
                orderBy : {
                    createdAt : "asc"
                }
            },
            members : {
                include : {
                    profile : true
                },
                orderBy : {
                    role : "asc"
                }
            }

        }
    })

    // console.log("server:",server)
    // console.log("Profile.id:",profile.id)

    // console.log("channels:",server.channels)

    const textChannels = server.channels.filter((channel) => {
        channel.type === ChannelType.TEXT
    })

    const audioChannels = server.channels.filter((channel) => {
        channel.type === ChannelType.AUDIO
    })

    const videoChannels = server.channels.filter((channel)=>{
        channel.type === ChannelType.VIDEO
    })

    
    const currentProfileRole = server.members.find((member)=>{
        return member.profileID === profile.id
    }).role

    const members = server?.members.filter((member)=>{
        member.profileID !== profile.id
    })

    if(!server)
        return redirect("/")


  return (
    <div className='flex flex-col h-full w-full text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]' >
        <ServerHeader 
            server={server}
            role={currentProfileRole}
        />
    </div>
  )
}
