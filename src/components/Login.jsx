import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext';
import view from '../assets/view.png';
import hide from '../assets/hide.png';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, errors } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        login({ email, password });
    }

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                    <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
                        <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="
                                bordder-[#E9EDF4]
                                w-full
                                rounded-md
                                border
                                bg-[#FCFDFE]
                                py-3
                                px-5
                                text-base text-body-color
                                placeholder-[#ACB6BE]
                                outline-none
                                focus:border-primary
                                focus-visible:shadow-none
                            "
                            />
                            {errors.email && (
                                <div className="flex">
                                    <span className="text-red-400 text-sm m-2 p-2">{errors.email}</span>
                                </div>
                            )}

                        </div>
                        <div className="mb-6">
                            <div className='flex items-center relative'>
                                <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="
                                    border-[#E9EDF4]
                                    w-full
                                    rounded-md
                                    border
                                    bg-[#FCFDFE]
                                    py-3
                                    px-5
                                    text-base text-body-color
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus:border-primary
                                    focus-visible:shadow-none
                                "
                                />
                                <img src={showPassword ? hide : view } alt="" className='h-8 absolute end-3'
                                onClick={() => setShowPassword(!showPassword)} />
                            </div>

                            {errors.password && (
                                <div className="flex">
                                    <span className="text-red-400 text-sm m-2 p-2">{errors.password}</span>
                                </div>
                            )}
                        </div>
                        <div className="mb-10">
                            <button
                            type="submit"
                            className="
                                w-full
                                px-4
                                py-3
                                bg-indigo-500
                                hover:bg-indigo-700
                                rounded-md
                                text-white
                            "
                            >
                            Login
                            </button>
                        </div>
                        </form>
                        <Link
                        to="/forgot-password"
                        className="
                            mb-2
                            inline-block
                            text-base text-[#adadad]
                            hover:text-primary hover:underline
                        "
                        >
                        Forgot Password?
                        </Link>
                        <p className="text-base text-[#adadad]">
                        Not a member yet?
                        <Link to="/register" className="text-primary hover:underline">
                            Sign Up
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login