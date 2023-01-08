import Head from 'next/head'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormik, FormikProps } from 'formik'
import { HiEye, HiEyeOff } from "react-icons/hi"
import { toast, TypeOptions } from "react-toastify"

import { registerValidation } from '../utils/validation'

interface FormValues {
    email: string
    password: string
    cpassword: string
}

const Signup: NextPage = () => {
    const [show, setShow] = useState({ password: false, cpassword: false })

    const router = useRouter()

    const formik: FormikProps<FormValues> = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidation,
        onSubmit: (values: FormValues) => {
            submitForm(values)
        }
    })

    const notify = (text: string, type: TypeOptions) => toast(text, { type })

    async function submitForm(values: FormValues) {
        const options = {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values)
        }

        await fetch('/api/signup', options).then(res => res.json()).then((data) => {
            if (data) {
                router.push('/')
                notify(data.message, 'info')
            } else {
                notify(data.errors.toString(), 'error')
            }
        })
    }

    return (
        <>
            <Head><title>Register</title></Head>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl pl-20 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...formik.getFieldProps('email')} />
                                    {formik.errors.email && formik.touched.email && <div className="text-xs text-red-600 py-2">{formik.errors.email}</div>}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                            <label className={`icon flex items-end justify-end dark:text-white ${formik.errors.password ? 'mb-8' : 'mb-0'}`} onClick={() => setShow({ ...show, password: !show.password })}>{!show.password ? <HiEyeOff size={25} /> : <HiEye size={25} />}</label>
                                        </div>
                                        <input type={`${show.password ? "text" : "password"}`} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...formik.getFieldProps('password')} />
                                        {formik.errors.password && formik.touched.password && <div className="text-xs text-red-600 py-2">{formik.errors.password}</div>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                            <label className={`icon flex items-end justify-end dark:text-white ${formik.errors.cpassword ? 'mb-8' : 'mb-0'}`} onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>{!show.cpassword ? <HiEyeOff size={25} /> : <HiEye size={25} />}</label>
                                        </div>
                                        <input type={`${show.cpassword ? "text" : "password"}`} id="cpassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...formik.getFieldProps('cpassword')} />
                                        {formik.errors.cpassword && formik.touched.cpassword && <div className="text-xs text-red-600 py-2">{formik.errors.cpassword}</div>}
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
