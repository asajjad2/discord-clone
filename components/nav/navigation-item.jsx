"use client"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import ActionTooltip from "@/components/action-tooltip"


export default function NavigationItem({id, imgURL, name}) {

    const params = useParams()
    const router = useRouter()

    const onClick = () => {
        router.push(`/server/${id}`)
    }


  return (
    <ActionTooltip side={'right'} align={'center'} label={name}>
        <button onClick={onClick} className="group relative flex items-center">
            <div className={cn(
                "absolute left-0 bg-primary rounded-r-full transition-all w-1",
                params?.serverID !== id && "group-hover:h-5",
                params?.serverID === id ? "h-9" : "h-2" 
            )}/>
            <div className={cn(
                "relative group flex mx-3 h-12 w-12 group-hover:rounded-2xl transition-all overflow-hidden rounded-full",
                params?.serverID === id && "bg-primary/10 text-primary rounded-2xl"
            )}>
                <Image 
                    fill
                    src={imgURL}
                    alt={name}
                />
            </div>
        </button>
    </ActionTooltip>
  )
}
