'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: any;
  setUser: (user: any) => void;
};

type AuthUser = {
  id: string,
  name: string,
  email: string,
  image?: string | null,
  bio?: string | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  console.log('authUser: ', user)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser) setUser(JSON.parse(storedUser))
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      { children }
    </AuthContext.Provider>
  )
}   

export const useAuth = () => {
  const context = useContext(AuthContext)  
  if(!context) {
    throw new Error("useAuth must be use within an AuthContextProvider")
  }
  return context
}