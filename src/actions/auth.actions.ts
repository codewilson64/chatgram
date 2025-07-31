'use server'

import bcrypt from 'bcrypt'
import validator from 'validator'
import prisma from "@/lib/prismadb";
import { cookies } from 'next/headers'
import generateToken from '@/lib/generateToken';

// sign up
export async function signUp({ username, email, password }: {username: string; email: string; password: string}) {

  try {
    // Validate fields
    if(!username || !email || !password) {
      return {error: "All fields must be filled"}
    }
    if(!validator.isEmail(email)) {
      return {error: "Please use the correct email"}
    } 
    if(!validator.isStrongPassword(password)) {
      return {error: "Password is not strong enough"}
    } 

    // Check user existance
    const emailExists = await prisma.user.findUnique({where: { email }})
    if(emailExists) return {error: "Email already exist"}

    const usernameExists = await prisma.user.findUnique({where: {username}})
    if(usernameExists) return {error: "Username already exist"}

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    // Create JWT token   
    if(user) await generateToken(user)

    return {
      success: true, 
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
    }
    
  } 
  catch (error: unknown) {
    if(error instanceof Error) {
      console.log("Error in signup route", error.message)
      return {error: error.message}
    } else {
      console.log("Unknown error in signup route", error)
      return { error: "An unexpected error occurred" }
    }
  }
}

// login
export async function login({username, password}: {username: string; password: string}) {
  try {
    // validate fields
    if(!username || !password) return {error: "All fields must be filled"}

    const user = await prisma.user.findUnique({where: {username}})
    if(!user) return {error: "Incorrect username"}
     
    const match = await bcrypt.compare(password, user.password)
    if(!match) return {error: "Incorrect password"}

    // generate token
    await generateToken({id: user.id})
    
    return {
      success: true, 
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.image,
          bio: user.bio
        }
    }
  } 
  catch (error: unknown) {
    if(error instanceof Error) {
      console.log("Error in login route", error.message)
      return {error: error.message}
    } else {
      console.log("Unknown error in login route", error);
      return { error: "An unexpected error occurred" };
    }
  }
}

// logout
export async function logout() {
  try {
    (await cookies()).delete('jwt')
    return {success: "You have logged out"}
  } 
  catch (error: unknown) {
    if(error instanceof Error) {
      console.log("Error in logout route", error.message)
      return {error: error.message}
    } else {
      console.log("Unknown error in logout route", error);
      return { error: "An unexpected error occurred" };
    }
  }
}
