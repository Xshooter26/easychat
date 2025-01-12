import React from 'react'
import Navbar from './components/Navbar.jsx'
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import {Loader, Loader2, Loader2Icon, LoaderCircle, LoaderCircleIcon, LoaderPinwheelIcon, LucideArrowDownWideNarrow, LucideLoader2} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'


//Using Axios for API calls
//using zustand for global state management library
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const {theme}= useThemeStore()



  console.log("onlineusers id :" ,onlineUsers);
  
  useEffect(() => {
    checkAuth();

  }, [checkAuth]);
  console.log({authUser});

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
        <LucideLoader2 className = 'size-15 animate-spin'/>
      </div>
  );


  return (
    <div data-theme={theme} className="">
    <Navbar/>
    
      <Routes>
      <Route path="/" element={authUser ? <HomePage/> : <Navigate to={"/login"}/>} />
        <Route path="/signup" element={!authUser? <SignupPage/> : <Navigate to ={ "/"}/>} />
        <Route path="/login" element={!authUser? <LoginPage/> : <Navigate to ={ "/"}/>} />
        <Route path="/settings" element= {<SettingsPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
      </Routes>
      <Toaster/>

</div>

  )
};

export default App;