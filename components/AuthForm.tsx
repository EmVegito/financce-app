"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import CustomInput from "./CustomInput"
import { authFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/user.actions"
import PlaidLink from "./PlaidLink"
  

const AuthForm = ({ type} : { type : string}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const formSchema = authFormSchema(type)

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
        

        if (type = 'sign-in') {
            const response = await signIn({
                email: data.email,
                password: data.password
            })

            if (response) { router.push('/')}
        }
        if (type = 'sign-up') {
            const userData = {
                firstName: data.firstName!,
                lastName: data.lastName!,
                address1: data.address1!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                dateOfBirth: data.dateOfBirth!,
                ssn: data.ssn!,
                email: data.email,
                password: data.password,
            }
            const newUser = await signUp(userData)

            setUser(newUser)
        }

    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='cursor-pointer flex items-center gap-1'>
                <Image 
                    src='/icons/logo.svg'
                    width={34}
                    height={34}
                    alt='logo'
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                    Horizon
                </h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user
                        ? 'Link Account'
                        : type === 'sign-in'
                            ? 'Log In'
                            : 'Sign Up'
                    }
                </h1>
                <p className='text-16 font-normal text-gray-600'>
                    {user
                        ? 'Link your account to get started'
                        : 'Welcome back! Please enter your details'
                    }
                </p>
            </div>
        </header>
        {user ? (
            <div className=' flex flex-col gap-4'>
                <PlaidLink user={user} variant="primary" />
            </div>
        ): (
           <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-in' ? (
                            <>
                                <CustomInput 
                                    control={form.control} 
                                    name='email' 
                                    label="Email" 
                                    placeholder="Enter your email" 
                                />
                                <CustomInput 
                                    control={form.control} 
                                    name='password' 
                                    label="Password" 
                                    placeholder="Enter your password" 
                                />
                            </>
                        ): (
                            <>
                                <div className="flex gap-4">
                                    <CustomInput 
                                        control={form.control} 
                                        name='firstName' 
                                        label="First Name" 
                                        placeholder="ex: John" 
                                    />
                                    <CustomInput 
                                        control={form.control} 
                                        name='lastName' 
                                        label="Last Name" 
                                        placeholder="ex: Doe" 
                                    />
                                </div>
                                <CustomInput 
                                    control={form.control} 
                                    name='address1' 
                                    label="Address" 
                                    placeholder="Enter your specific address" 
                                />
                                <CustomInput 
                                    control={form.control} 
                                    name='city' 
                                    label="City" 
                                    placeholder="Enter your city" 
                                />
                                <div className="flex gap-4">
                                    <CustomInput 
                                        control={form.control} 
                                        name='state' 
                                        label="State" 
                                        placeholder="ex: Uttarakhand" 
                                    />
                                    <CustomInput 
                                        control={form.control} 
                                        name='postalCode' 
                                        label="Postal Code" 
                                        placeholder="ex: 263148" 
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput 
                                        control={form.control} 
                                        name='dateOfBirth' 
                                        label="Date Of Birth" 
                                        placeholder="yyyy-mm-dd" 
                                    />
                                    <CustomInput 
                                        control={form.control} 
                                        name='ssn' 
                                        label="SSN" 
                                        placeholder="ex: 1234" 
                                    />
                                </div>
                                <CustomInput 
                                    control={form.control} 
                                    name='email' 
                                    label="Email" 
                                    placeholder="Enter your email" 
                                />
                                <CustomInput 
                                    control={form.control} 
                                    name='password' 
                                    label="Password"
                                    placeholder="Enter your password" 
                                />
                            </>
                        )}
                        <Button type="submit" disabled={isLoading} className="w-full rounded-lg bg-blue-500 text-white">
                            {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                                        Loading...
                                    </>
                                ):(
                                    <span className="text-16">
                                        {type === 'sign-in' ? 'Log In' : 'Sign Up'}
                                    </span>
                            )}
                        </Button>
                        <footer className="justify-center flex gap-2 ">
                            <p className="text-14 text-gray-600 font-normal">
                                {type === 'sign-in' ? "Don't have an account?" : 'Already have an Account?'} 
                            </p>
                            <Link href={type === 'sign-in' ? './sign-up' : 'sign-in'} className="form-link">
                                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                            </Link>
                        </footer>
                    </form>
                </Form>
           </>
        )}
    </section>
  )
}

export default AuthForm