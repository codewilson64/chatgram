'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type AuthUser = {
  id: string,
  username: string,
  email: string,
  image?: string | null,
  bio?: string | null
}
type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
};


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