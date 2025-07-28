import getUserFromToken from "./auth.helper"
import { redirect } from "next/navigation"

const requireAuth = async () => {
  try {
    return await getUserFromToken()
  } 
  catch {
    redirect('/login')
  }
}

export default requireAuth