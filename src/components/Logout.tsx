'use client'

import { logout } from '@/actions/auth.actions';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

const Logout = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useAuth()

  const handleLogout = async () => {
    setLoading(true)
    const response = await logout()
      if(response.success) {
        setUser(null)
        localStorage.removeItem('user')
        router.push('/login')
      } else {
        console.log(response.error)
    }
    setLoading(false)
  }

  return (
    <Button onClick={handleLogout} className='w-10 h-10 rounded-xl fixed bottom-6 right-6'>
      <LogOut className='size-7'/>
    </Button>
  )
}

export default Logout