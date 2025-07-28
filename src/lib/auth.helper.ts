import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

const getUserFromToken = async () => {
  // Get token from cookies named 'jwt'  
  const cookieStore = await cookies()
  const token = cookieStore.get('jwt')?.value

  if(!token) throw new Error("Unauthorized: No token")

  // Decode token
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET not set')

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & {id: string} 
    return decoded
  } 
  catch (error) {
    console.log(error)
    throw new Error("Invalid token")
  }
}

export default getUserFromToken