import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { NextResponse } from "next/server";

import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from "@prisma/client";

export async function POST(req, res) {
    try {
        const {name , imgURL} = await req.json()
        const profile = await currentProfile()

        if(!profile)
        return new NextResponse({
            status : 401,
            body : "Unauthorized"
        })

        const server = await db.server.create({
            data : {
                name,
                imgURL,
                inviteCode : uuidv4(),
                profileID : profile.id,
                members : {
                    create : {
                        profileID : profile.id,
                        role : MemberRole.ADMIN
                    }
                },
                channels : {
                    create : {
                        name : "General",
                        profileID : profile.id,
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("SERVER_POST", error)
        return new NextResponse({
            status : 500,
            body : "Internal Error"
        })
    }
}
