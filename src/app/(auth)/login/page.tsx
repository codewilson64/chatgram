'use client'

import { login } from '@/actions/auth.actions'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState('')
  const router = useRouter()

  const { setUser } = useAuth()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await login({username, password})
      
      if(response.success) {
        setUser(response.user)
        // Store user id to localStorage
        localStorage.setItem('user', JSON.stringify(response.user))
        setSuccess("Login Success")
        router.push('/')
      } else {
        setError(response.error)
      }
    } 
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-[1000px] mx-auto flex justify-center items-center h-screen'>
      <form onSubmit={handleLogin} className='w-[400px]'>
        <div className='text-center text-5xl font-bold py-5'>
          <h3>Log in</h3>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label>Username:</label>
            <input 
                className='border border-gray-300/60 dark:border-zinc-300/20 dark:bg-[#181818] text-black dark:text-white outline-0 rounded-lg px-3 py-1'
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label>Password:</label>
            <input 
                className='border border-gray-300/60 dark:border-zinc-300/20 dark:bg-[#181818] text-black dark:text-white outline-0 rounded-lg px-3 py-1'
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type='submit' className='w-[120px] mx-auto rounded-lg font-mono'>
            {loading ? 'Processing...' : 'Login'}
          </Button>

          <Link href={'/signup'} className='mx-auto'>
            <Button type='submit' variant={'ghost'} className='w-[120px] mx-auto p-2 rounded-lg font-mono'>
              Sign up
            </Button>
          </Link>

          {error && <div className='text-red-500'>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default LoginPage