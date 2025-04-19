import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SmallSpinner from '@/components/ui/SmallSpinner';
import { getUsername, signin } from '@/services/apiBlog';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = ({ setIsAuthenticated, setUsername }) => {

    const { register, handleSubmit, formState } = useForm()

    const { errors } = formState;

    const location = useLocation()
    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => signin(data),
        onSuccess: (response) => {
            // seteamos la información del token
            localStorage.setItem("access", response.access)
            localStorage.setItem("refresh", response.refresh)
            setIsAuthenticated(true)
            getUsername().then(res => setUsername(res.username))
            toast.success("You have successfully signed up!")
            const from = location?.state?.from?.pathname || "/"
            navigate(from, { replace: true })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        mutate(data)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 
        items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl 
        dark:text-white dark:bg-[#141624]"
        >
            <div className="flex flex-col gap-2 justify-center items-center mb-2">
                <h3 className="font-semibold text-2xl">Signin Form</h3>
                <p>Welcome back! Log in to continue.</p>
            </div>

            <div>
                <Label htmlFor="username" className="dark:text-[97989F]">
                    Username
                </Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    disabled={isPending}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required"
                        },
                    })}
                />
                {errors?.username?.message && (<small className="text-red-700">{errors.username.message}</small>)}
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    disabled={isPending}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px]  w-[300px]"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Password is required"
                        }
                    })}
                />
                {errors?.password?.message && (<small className="text-red-700">{errors.password.message}</small>)}
            </div>

            <div className="w-full flex items-center justify-center flex-col my-4">
                <button disabled={isPending} className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                    {isPending ? (<><SmallSpinner /></>) :
                        (<small className="text-[16px]">Login</small>)
                    }

                </button>
                <p className="text-[14px]">
                    Dont have an account? <Link to="/signup">signup</Link>
                </p>
            </div>
        </form>
    );
}

export default LoginPage