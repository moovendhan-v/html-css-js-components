import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { getUserData, logout } from "@/appwrite";
import { useAuthStore } from '@/store/Auth/Auth';


export default function Authtest() {
  const navigate = useNavigate()
  const logoutAction = useAuthStore((state) => state.logout); // Get logout action from Zustand store

  useEffect(() => {
    getUserData()
      .then((account) => useAuthStore.getState().setUser(account))
      .catch((error) => navigate('/authlogin'))
  }, [])

  const account = useAuthStore((state) => state.user);

  const handleLogOut = () => {
    logoutAction(); 
    logout()
      .then(() => navigate('/'))
      .catch((error) => {
        console.error('Logout error:', error);
        // Handle logout error if needed
      });
  };
  if (!account) return <p>You aren't logged in.</p>

  return (
    <div>
      <p>Logged in as {account.email}</p>
      <p>Logged in as {account.name}</p>

      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}