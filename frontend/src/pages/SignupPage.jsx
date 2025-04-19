import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SmallSpinner from '@/components/ui/SmallSpinner';
import { Textarea } from '@/components/ui/textarea';
import { registerUser, updateProfile } from '@/services/apiBlog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignupPage = ({ userInfo, updateForm, toggleModal }) => {

    const queryClient = useQueryClient()

    const { register, handleSubmit, formState, reset, watch } = useForm({ defaultValues: userInfo ? userInfo : {} })

    const { errors } = formState;

    const password = watch("password");

    const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
        mutationFn: (data) => updateProfile(data),
        onSuccess: () => {
            toast.success("Profile updated successful!")
            toggleModal()
            queryClient.invalidateQueries({ queryKey: ["users", userInfo?.username] })
            queryClient.invalidateQueries({ queryKey: ["username"] })

        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    const { mutate, isPending: isRegisterPending } = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: () => {
            toast.success("You have successfully create an account")
            reset()
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        if (updateForm) {
            const formData = new FormData()
            formData.append("username", data.username)
            formData.append("first_name", data.first_name)
            formData.append("last_name", data.last_name)
            formData.append("bio", data.bio)
            if (data.profile_picture && data.profile_picture[0]) {
                if (data.profile_picture[0] != "/") {
                    formData.append("profile_picture", data.profile_picture[0])
                }
            }
            updateMutate(formData)
        } else {
            mutate(data)
        }


    }

    return (
        <form
            className={`${updateForm && "h-[90%] overflow-auto"} md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
        rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`} onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-2 justify-center items-center mb-2">
                {updateForm ?
                    <h3 className="font-semibold text-2xl">Update Profile</h3>
                    :
                    <>
                        <h3 className="font-semibold text-2xl">SignUp Form</h3>
                        <p>Create your account to get started!</p>
                    </>
                }

            </div>

            <div>
                <Label htmlFor="username" className="dark:text-[97989F]">
                    Username
                </Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required"
                        },
                        minLength: {
                            value: "3",
                            message: "Username must be at least 3 characters",

                        }
                    })}
                />
                {errors?.username?.message && (
                    <small className="text-red-700">{errors.username.message}</small>
                )}
            </div>

            <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                    type="text"
                    id="first_name"
                    placeholder="Enter first name"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                    {...register("first_name", {
                        required: {
                            value: true,
                            message: "Firstname is required"
                        },
                        minLength: {
                            value: "3",
                            message: "Firstname must be at least 3 characters",

                        }
                    })}
                />
                {errors?.first_name?.message && (<small className="text-red-700">{errors.first_name.message}</small>)}
            </div>

            <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                    type="text"
                    id="last_name"
                    placeholder="Enter last name"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                    {...register("last_name", {
                        required: {
                            value: true,
                            message: "Lastname is required"
                        },
                        minLength: {
                            value: "3",
                            message: "Lastname must be at least 3 characters",

                        }
                    })}
                />
                {errors?.last_name?.message && (<small className="text-red-700">{errors.last_name.message}</small>)}
            </div>
            {updateForm && <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    placeholder="Enter your bio"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                    {...register("bio", {
                        required: false,
                    })}
                />
                {errors?.bio?.message && (<small className="text-red-700">{errors.bio.message}</small>)}
            </div>}

            {updateForm && <div className="w-full">
                <Label htmlFor="profile_picture">Profile Picture</Label>
                <Input
                    type="file"
                    id="picture"
                    {...register("profile_picture", {
                        required: false,
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
                />

            </div>}

            {updateForm || <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Email is required"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Email no valid",

                        }
                    })}
                />
                {errors?.email?.message && (<small className="text-red-700">{errors.email.message}</small>)}
            </div>}

            {updateForm || <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Password is required"
                        },
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />
                {errors?.password?.message && (<small className="text-red-700">{errors.password.message}</small>)}
            </div>}

            {updateForm || <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Password is required"
                        },
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                        validate: (data) => data === password || "Passwords do not match",
                    })}
                />
                {errors?.confirmPassword?.message && (<small className="text-red-700">{errors.confirmPassword.message}</small>)}
            </div>
            }
            <div className="w-full flex items-center justify-center flex-col my-4">
                {updateForm ?
                    <>
                        <button type="submit" className="bg-[#4B6BFB] text-white w-full py-3 px-2 my-3 rounded-md flex items-center justify-center gap-2">
                            {isUpdatePending ? (<SmallSpinner />) : (<div>Update Profile</div>)}
                        </button>
                        <button type="button" className="bg-[#fb4b4b] text-white w-full py-3 px-2 my-3 rounded-md flex items-center justify-center gap-2" onClick={toggleModal}>
                            {isUpdatePending ? (<SmallSpinner />) : (<div>Cancel</div>)}
                        </button>
                    </> :
                    <>
                        <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                            {isRegisterPending ? (<SmallSpinner />) : (<div>Signup</div>)}
                        </button>
                        <p className="text-[14px]">
                            Already have an account? Sign in
                            {/* Already have an account? <Link to="/signin">Sign In</Link> */}
                        </p>
                    </>}
            </div>
        </form>
    );
};

export default SignupPage;