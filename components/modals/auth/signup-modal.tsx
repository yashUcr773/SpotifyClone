"use client"

import { useForm } from "react-hook-form"
import SocialButtons from "./social-buttons"
import { Button } from "@/components/ui/button"
import { BsGithub, BsGoogle } from "react-icons/bs"
import { useModal } from "@/hooks/use-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from "@/components/ui/form"
import FormInput from "@/components/form/form-input"
import toast from "react-hot-toast"
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useState } from "react"
import { AUTH_MODAL_SOCIALS } from "@/types"
import { useRouter } from "next/navigation"
import DemoUserCreds from "./DemoUserCreds"

const formSchema = z.object({
    firstname: z.string().min(1, { message: 'Firstname is required' }),
    lastname: z.string().min(1, { message: 'Lastname is required' }),
    email: z.string().email().min(1, { message: 'Email is required' }),
    password: z.string().min(6, { message: 'Password should be 6-24 characters' }).max(24, { message: 'Password should be 6-24 characters' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function SignupModal() {

    const { closeModal, openModal, isOpen, type } = useModal()
    const isModalOpen = isOpen && type === 'signup'
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const isLoading = loading || form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            await axios.post('/api/register', values);
            toast.success('Sign up successful!');
            form.reset()
            closeModal()

            let result = await signIn('credentials', {
                ...values, redirect: false
            })
            if (result?.error) {
                toast.error('Invalid Credentials!')
            }
            if (result?.ok && !result?.error) {
                toast.success('Log in Successful!')
                router.refresh()
            }

            router.refresh()

        } catch (e) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    const onFormToggle = () => {
        closeModal()
        openModal('signin')
    }

    const socialAction = async (action: AUTH_MODAL_SOCIALS) => {
        try {
            setLoading(true)
            const result = await signIn(action, { redirect: false })
            if (result?.error) {
                toast.error('Invalid Credentials!')
            }
            if (result?.ok && !result?.error) {
                toast.success('Log in Successful!')
                form.reset()
                router.refresh()
                closeModal()
            }
        } catch (e) {
            toast.error('Something went wrong!')
        }
        finally {
            setLoading(false)
        }
    }

    const handleModalClose = () => {
        closeModal();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
            <DialogContent className="rounded-lg  shadow bg-gray-800 border-none overflow-hidden text-white w-11/12 max-w-[480px]">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Signup to start listening to songs
                    </DialogTitle>

                    <DialogDescription className="text-center text-base text-white">
                        Create a new account
                    </DialogDescription>
                </DialogHeader>
                <div className="px-6 mt-4">
                    <div className="flex gap-4">
                        <SocialButtons isLoading={isLoading} icon={<BsGithub></BsGithub>} onClick={() => socialAction('github')}></SocialButtons>
                        <SocialButtons isLoading={isLoading} icon={<BsGoogle></BsGoogle>} onClick={() => socialAction('google')}></SocialButtons>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-gray-800 px-2 text-white">or contiue with</span>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-4 px-5 flex flex-col items-center justify-center">
                                <div className="flex flex-row justify-center items-center gap-x-2 w-full">
                                    <FormInput form={form} isLoading={isLoading} label='FirstName' name="firstname" placehoder="Enter Firstname."></FormInput>
                                    <FormInput form={form} isLoading={isLoading} label='LastName' name="lastname" placehoder="Enter Lastname."></FormInput>
                                </div>
                                <FormInput form={form} isLoading={isLoading} label='Email' name="email" placehoder="Enter Email."></FormInput>
                                <FormInput type="password" form={form} isLoading={isLoading} label='Password' name="password" placehoder="••••••••"></FormInput>
                                <FormInput type="password" form={form} isLoading={isLoading} label='Confirm Password' name="confirmPassword" placehoder="••••••••"></FormInput>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <Button disabled={isLoading} variant={'primary'} size={'lg'} className="rounded-full">
                                    Signup
                                </Button>
                            </div>
                        </form>
                    </Form>

                </div>
                <div className="flex gap-2 justify-center text-sm mt-2 px-2 text-gray-300">
                    Already a user?
                    <div className="underline cursor-pointer" onClick={onFormToggle}>

                        Login
                    </div>
                </div>
                <DemoUserCreds></DemoUserCreds>

            </DialogContent>
        </Dialog>
    )
}