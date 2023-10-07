import React from 'react'
import { initialProfile } from '@/lib/initial-profile'
import db from '@/lib/db'

import InitialModal from '@/components/modals/initial-modal'

import { redirect } from 'next/navigation'

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
        return redirect(`/server/${Server.id}`);



    return (
        <div>
            <InitialModal />
        </div>
    )
}

export default Setup