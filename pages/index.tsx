import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormik, FormikProps } from 'formik'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { toast, TypeOptions } from "react-toastify"

import { loginValidation } from '../utils/validation'

interface FormValues {
  email: string
  password: string
}

const Login: NextPage = () => {
  const [show, setShow] = useState({ password: false, cpassword: false })

  const router = useRouter()

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: loginValidation,
    onSubmit: (values: FormValues) => {
      submitForm(values)
    }
  })

  const notify = (text: string, type: TypeOptions) => toast(text, { type })

  async function submitForm(values: FormValues) {
    const options = {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values)
    }

    await fetch('/api/login', options).then(res => res.json()).then((data) => {
      if (data) {
        router.push('/api/verify')
        notify(data.message, 'info')
      } else {
        notify(data.errors.toString(), 'error')
      }
    })
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl pl-40 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div className={`${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" value={formik.values.email} onChange={formik.handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div className={`${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <label className='icon flex items-end justify-end dark:text-white' onClick={() => setShow({ ...show, password: !show.password })}>{!show.password ? <HiEyeOff size={25} /> : <HiEye size={25} />}</label>
                  </div>
                  <input type={`${show.password ? "text" : "password"}`} value={formik.values.password} onChange={formik.handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
