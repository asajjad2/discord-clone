import React from 'react'
import { initialProfile } from '@/lib/initial-profile'
import db from '@/lib/db'

import { Redirect } from 'next'

const Setup = async () => {

    const Profile = await initialProfile();
    const Server = await db.server.findFirst({
        where: {
            members : {
                some : {
                    profileID : Profile.id
                }
            }
        },
    });

    if(Server)
        return <Redirect to={`/servers/${Server.id}`} /> 


    return (
        <div>
            <h1>Create a Server</h1>
        </div>
    )
}

export default Setup