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
import FormInput from "@/components/form-input"
import { useState } from "react"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"


const formSchema = z.object({
    email: z.string().email().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
})

export default function SigninModal() {
    const { closeModal, openModal, isOpen, type } = useModal()
    const isModalOpen = isOpen && type === 'signin'
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const isLoading = loading || form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            let result = await signIn('credentials', {
                ...values, redirect: false
            })
            if (result?.error) {
                toast.error('Invalid Credentials!')
            }
            if (result?.ok && !result?.error) {
                toast.success('Log in Successful!')
                form.reset()
                closeModal()
            }
        } catch (e) {
            toast.error('Something went wrong!')
        }
        finally {
            setLoading(false)
        }
    }

    const socialAction = async (action: AUTH_MODAL_SOCIALS) => {
        try {
            setLoading(true)
            const result = await signIn(action, { redirect: false })
            console.log(result)
            if (result?.error) {
                toast.error('Invalid Credentials!')
            }
            if (result?.ok && !result?.error) {
                toast.success('Log in Successful!')
                form.reset()
                closeModal()
            }
        } catch (e) {
            toast.error('Something went wrong!')
        }
        finally {
            setLoading(false)
        }
    }

    const onFormToggle = () => {
        closeModal()
        openModal('signup')
    }

    const handleModalClose = () => {
        closeModal();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
            <DialogContent className="rounded-lg  shadow bg-gray-800 border-none overflow-hidden text-white w-11/12 max-w-[480px]">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Welcome back
                    </DialogTitle>

                    <DialogDescription className="text-center text-base text-white">
                        Log in to your account
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
                                <FormInput form={form} isLoading={isLoading} label='Email' name="email" placehoder="Enter Email."></FormInput>
                                <FormInput type="password" form={form} isLoading={isLoading} label='Password' name="password" placehoder="••••••••"></FormInput>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <Button disabled={isLoading} variant={'primary'} size={'lg'} className="rounded-full">
                                    Login
                                </Button>
                            </div>
                        </form>
                    </Form>

                </div>
                <div className="flex gap-2 justify-center text-sm mt-2 px-2 text-gray-300">
                    Dont have an account?
                    <div className="underline cursor-pointer" onClick={onFormToggle}>
                        Signup
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}