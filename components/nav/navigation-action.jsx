"use client"
import React from 'react'
import { Plus } from 'lucide-react'

import ActionTooltip from '../action-tooltip'

export default function NavigationAction() {
  return (
    <div>
        <ActionTooltip side={'right'} align={'center    '} label={'Add a Server'}>
            <button className='group flex items-center'>
                <div className='flex items-center justify-center mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 transition-all overflow-hidden'>
                    <Plus className='group-hover:text-white transition text-emerald-500' size={25} />
                </div>
            </button>
        </ActionTooltip>
        
    </div>
  )
}
