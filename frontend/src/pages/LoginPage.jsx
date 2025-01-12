import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { EarthLockIcon, Eye, EyeOff, Loader2, LockIcon, LucideMessageCircle, LucideMessageSquare, Mail, MessageCircleHeartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData ] = useState({
    email:"",
    password:"",
  })

  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async(e) => {
    e.preventDefault()
    login(formData)

  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    {/*This is LEft */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-cyan-950 flex 
              items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
            >
              <LucideMessageCircle className="size-6 text-accent" />
            </div>
            <h1 className="text-2xl font-bold mt-3 font-serif">Welcome Back! It's good to see you again</h1>
            <p className="text-base-content/60 mt-0">Sign in to your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}

{/*Email Form*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10 font-serif`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>


{/*Password Form*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold font-serif">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10 font-serif`}
                placeholder=""
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-accent" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-accent w-full font-serif" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            New to EasyChat? Create an Account{" "}
            <Link to="/signup" className="link link-accent">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* The right side */}

    <div className="hidden lg:flex items-center justify-center alpha-10">
      <img 
        src="/src/assets/image2.jpg" 
        alt="Signup Illustration" 
        className="signup-image rounded-2xl"
      />
    </div>
  </div>
  )
}

export default LoginPage