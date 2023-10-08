import { currentProfile }  from "@/lib/current-profile";
import db from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

import { NextResponse } from "next/server";
import { parse } from 'url';


export async function PATCH(req, {params}) {

    // const { serverID } = req.query;

    try {
        const serverID = params.serverID
        const profile = await currentProfile()

        if(!profile)
            return new NextResponse({
                status : 401,
                body : "Unauthorized"
        })

        if(!serverID)
            return new NextResponse({
                status : 400,
                body : "Server ID missing"
        })

        console.log("serverID:", serverID)

        const server = await db.server.update({
            where : {
                id : serverID,
                profileID : profile.id
            },
            data : {
                inviteCode : uuidv4()
            }
        })
        
        return NextResponse.json(server)

    } catch (error) {
        console.log("SERVER_PATCH", error)
        return new NextResponse({
            status : 500,
            body : "Internal Error"
        })
    }
}