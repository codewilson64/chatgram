'use client'

import { useAuth } from '@/context/AuthContext'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import { Button } from './ui/button'
import { UserRound } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth()

  return (
    <div className='w-full flex items-center justify-between py-5 px-7 border border-gray-300/50 dark:border-zinc-300/20 rounded-xl'>
      <Link href={'/'} className='text-xl font-bold'>Chatgram.</Link>
      <div className='flex items-center gap-3'>
        <Link href={`/profile/${user?.username}`}>
          <Button variant={'outline'} className='flex items-center gap-2'>
            <UserRound className='size-5'/>
            Profile
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar