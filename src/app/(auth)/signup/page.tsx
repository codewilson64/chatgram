'use client'

import { signUp } from '@/actions/auth.actions'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const { setUser } = useAuth()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await signUp({username, email, password})
      
      if(response.success) {
        setUser(response.user)
        // Store user id to localStorage
        localStorage.setItem('user', JSON.stringify(response.user))
        router.push('/')
      } else {
        setError(response.error || "Something went wrong")
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
      <form onSubmit={handleSignup} className='w-[400px]'>
        <div className='text-center text-5xl font-bold py-5'>
          <h3>Sign Up</h3>
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
          <label>Email:</label>
          <input 
            className='border border-gray-300/60 dark:border-zinc-300/20 dark:bg-[#181818] text-black dark:text-white outline-0 rounded-lg px-3 py-1'
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button type='submit' className='w-[120px] mx-auto p-2 rounded-lg font-mono'>
            {loading ? 'Processing...' : 'Sign up'}
          </Button>

          <Link href={'/login'} className='mx-auto'>
            <Button type='submit' variant={'ghost'} className='w-[120px] mx-auto p-2 rounded-lg font-mono'>
               Log in
            </Button>
          </Link>

          {error && <div className='text-red-500'>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default SignupPage