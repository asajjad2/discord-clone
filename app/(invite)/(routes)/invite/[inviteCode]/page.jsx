import React from 'react'
import { currentProfile } from '@/lib/current-profile'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
export default async function InvitePage({ params }) {

    const profile = await currentProfile()

    if(!currentProfile)
        return redirectToSignIn()

    if(!params.inviteCode)
        return redirect("/")

    // if member already in server
    const existingServer = await db.server.findFirst({
        where : {
            inviteCode : params.inviteCode,
            members : {
                some : {
                    profileID : profile.id
                }
            }
        }
    })

    console.log("existingServer:",existingServer)

    if(existingServer)
        return redirect(`/server/${existingServer.id}`)

    // add to server
    const server = await db.server.update({
        where : {
            inviteCode : params.inviteCode
        },
        data : {
            members : {
                create : [
                    {
                        profileID : profile.id,
                    }
                ]
            }
        }
    })

    console.log("server:",server)

    if(server)
        return redirect(`/server/${server.id}`)

    return null
}
