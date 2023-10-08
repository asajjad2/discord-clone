"use client"

import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useModalStore } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'

import axios from 'axios'

export default function InviteModal() {

    const { isOpen, openModal, closeModal, type, data } = useModalStore()
    let server = data.server;
    const origin = useOrigin()
    const inviteURL = `${origin}/invite/${server?.inviteCode}`;

    const isModalOpen = isOpen && type === 'invite-people'

    const [isCopied, setIsCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onNewInviteCode = async () => {
        setIsLoading(true)
        const url = `/api/server/${server.id}/invite`
        // console.log("url",url)
        try {
            // console.log(server.id)
            const response = await axios.patch(url)
            server = response.data

            openModal("invite-people", {server})
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    const onCopy = () => {
        navigator.clipboard.writeText(inviteURL)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }


  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>

            <DialogHeader className={'pt-8 px-6'}>
                <DialogTitle className="text-2xl text-center font-bold">
                    Invite Friends
                </DialogTitle>
            </DialogHeader>

            <div className="p-6">
                <Label  className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server Invite Link</Label>
                <div className="flex items-center mt-2 gap-x-2">
                    <Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" value={inviteURL} disabled = {isLoading} readOnly/>
                    <Button size={"icon"}
                        onClick = {onCopy}
                        disabled = {isLoading}
                    >
                        {
                            isCopied ? <Check className="h-4 w-4" /> : <Copy className='w-4 h-4'/>  
                        }
                    </Button>
                </div>
                <Button
                    variant={'link'}
                    size={'sm'}
                    disabled = {isLoading}
                    onClick = {onNewInviteCode}
                    className="text-xs text-zinc-500 mt-4"
                >
                    Generate a new link
                    <RefreshCw className='h-4 w-4 ml-2'/>
                </Button>
            </div>

        </DialogContent>
    </Dialog>
  ) 
}
