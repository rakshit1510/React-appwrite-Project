import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin, logout } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import Logo from '../Logo'
import { useDispatch } from 'react-redux'

export default function Signup(props) {
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const create = async (data) => {
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(authLogin(user))
                    navigate("/")
                }
                else setError("failed to retrieve user Data")

            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                <Link
                    to={'/login'}
                    >
                    Sign In
                </Link>
                    </p>
                {error && <p  className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your Full Name"
                        {...register("name",{
                            required: true,
                        })}
                        />
                         <Input
                label="Email"
                placeholder="Enter the email"
                type="email"
                {...register("email",{
                    required:true,
                    validate: {
                        matchPattern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) 
                            ? true 
                            : "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password:"
                type="password"
                placeholder="Enter your Password"
                {...register("password",{
                    required:true,
                    
                })}
                />
                <Button
                type='submit'
                className='w-full'
                >Create Account</Button>
                
                    </div>
                </form>
            </div>
        </div>
    )
}
