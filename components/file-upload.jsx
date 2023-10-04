"use client"
import React from 'react'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import { X } from 'lucide-react'
import "@uploadthing/react/styles.css"

export default function fileUpload({onChange, value, endpoint}) {

    const fileType = value?.split('.').pop()
    if(value && fileType !== "pdf"){
        return (
            <div className="relative h-20 w-20">
                <Image 
                    src={value}
                    fill
                    objectFit="contain"
                    className='rounded-full'
                />
                <button 
                    onClick={()=>{onChange("")}}
                    className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
                    type='button'
                >
                    <X />
                </button>
            </div>
        )
    }

  return (
    <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete = {(res) => {
            onChange(res?.[0].url)
        }}
        onUploadError = {(err) => {
            console.log(err)
        }}
    />
  )
}
