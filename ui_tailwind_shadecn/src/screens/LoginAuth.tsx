import { useNavigate } from "react-router-dom"
import { getUserData, login } from "../appwrite";
import { useEffect } from "react";
import { useAuthStore } from "@/store/Auth/Auth";

export default function AuthLogin() {
  const navigate = useNavigate()

  login()
  .then((account) => alert(`Successfully logged in from: ${account}`))
  .finally(() => navigate('/'))

  useEffect(() => {
    getUserData()
      .then((account) => useAuthStore.getState().setUser(account))
      .catch((error) => navigate('/authlogin'))
  }, [])
  
  return (
 <>
 <button onClick={login}> 
login

 </button>
 </>
  )
}