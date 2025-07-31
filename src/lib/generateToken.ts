import { SignJWT } from "jose";
import { cookies } from "next/headers";

const generateToken = async (user: {id: string}) => {

  const token = await new SignJWT({id: user.id})
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('3d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))

  // Set cookies
  const cookieStore = await cookies()  

  cookieStore.set('jwt', token, {
    httpOnly: true,
    maxAge: 3*24*60*60,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development'
  })

  return token
}

export default generateToken