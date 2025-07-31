'use client'

import { useAuth } from '@/context/AuthContext'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import { Button } from './ui/button'
import { UserRound } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth()

  return (
    <div className='w-full max-w-[1280px] mx-auto flex items-center justify-between py-3'>
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