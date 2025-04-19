import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
// import { useEffect, useState } from "react";
import { createBlog, getCategories, updateBlog } from "@/services/apiBlog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import InputError from "@/components/ui/InputError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import SmallSpinner from "@/components/ui/SmallSpinner";


const CreatePostPage = ({ blog, toggleModal }) => {


    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: blog ? {
            ...blog, ...{ "category": String(blog.categories[0].id) }
        } : {}
    })
    const { errors } = formState
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const blogId = blog ? blog.id : false

    const { mutate: mutateUpdate, isPending: isUpdatePending } = useMutation({
        mutationFn: ({ data, id }) => updateBlog(data, id),
        onSuccess: () => {
            toast.success("Your post has been updated successfully!")
            navigate("/")
        }

    })

    const { mutate, isPending: isCreatePending } = useMutation({
        mutationFn: (data) => createBlog(data),
        onSuccess: () => {
            toast.success("New post added successfully")
            // invalida la consulta para que se marque como obsoleta, así se recupera nuevamente
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
            navigate("/")
        },
        onError: (err) => {
            toast.error(err);
            console.log("Error updating blog", err);
        },
    })

    function onSubmit(data) {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("content", data.content)
        formData.append("categories_ids", data.category) // llega al backend como lista
        if (data.featured_image && data.featured_image[0]) {
            if (data.featured_image[0] !== "/") {
                formData.append("featured_image", data.featured_image[0])
            }

        }
        console.log(data)

        if (blog && blogId) {
            mutateUpdate({ data: formData, id: blogId })
        } else {
            mutate(formData)
        }

    }


    // const [categories, setCategories] = useState([])

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const data = await getCategories()
    //             setCategories(data)
    //             console.log(data)
    //         } catch (error) {
    //             console.error("Error fetching categories:", error)
    //         }
    //     }
    //     fetchCategories()
    // }, [setCategories])

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={`${blog && "h-[90%] overflow-auto"} md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}>
            <div className="flex flex-col gap-2 justify-center items-center mb-2">
                <h3 className="font-semibold text-2xl">{blog ? "Update Post" : "Create Post"}</h3>
                {blog ? "Do you want to update your post" : "Create a new post and share your ideas"}
            </div>

            <div>
                <Label htmlFor="title" className="dark:text-[97989F]">
                    Title
                </Label>
                <Input
                    type="text"
                    id="title"
                    {...register("title", {
                        required: {
                            value: true,
                            message: "Title is required"
                        },
                        minLength: {
                            value: 3,
                            message: "The title must be at least 3 characters"
                        }
                    })}
                    placeholder="Give your post a title"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px]"
                />
                {errors?.title?.message && (<InputError error={errors.title.message} />)}
            </div>

            <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    {...register("content", {
                        required: {
                            value: true,
                            message: "Content is required"
                        },
                        minLength: {
                            value: 10,
                            message: "The content must be at least 10 characters"
                        }
                    })}
                    placeholder="Write your blog post"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[400px] text-justify"
                />
                {errors?.content?.message && (<InputError error={errors.content.message} />)}
            </div>

            <div className="w-full">
                <Label htmlFor="category">Category</Label>
                <Select
                    {...register("category", {
                        required: {
                            value: true,
                            message: "Category is required"
                        }
                    })}
                    onValueChange={(value) => setValue("category", String(value))} // al ser un id siempre convertimos a String para que haga match
                    defaultValue={blog?.categories ? String(blog.categories[0].id) : ""}

                >
                    <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>

                            {isLoading ? <div>Loading...</div> :
                                <>{
                                    categories?.map((category) => (
                                        <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                    ))
                                }</>
                            }

                        </SelectGroup>
                    </SelectContent>
                </Select>

                {errors?.category?.message && (<InputError error={errors.category.message} />)}
            </div>

            <div className="w-full">
                <Label htmlFor="featured_image">Featured Image</Label>
                <Input
                    type="file"
                    id="picture"
                    {...register("featured_image", {
                        required: {
                            value: blog ? false : true,
                            message: "Image is required"
                        }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full"
                />
                {errors?.featured_image?.message && (<InputError error={errors.featured_image.message} />)}
            </div>


            <div className="w-full flex items-center justify-center flex-col my-4">
                {blog ?
                    <>
                        <button type="submit" disabled={isUpdatePending} className="bg-[#4B6BFB] text-white w-full py-3 px-2 my-3 rounded-md flex items-center justify-center gap-2 cursor-pointer">
                            {isUpdatePending ? (<SmallSpinner />) : (<small className="text-[16px]">Update Post</small>)}
                        </button>
                        <button type="button" disabled={isUpdatePending} className="bg-[#fb4b4b] text-white w-full py-3 px-2 my-3 rounded-md flex items-center justify-center gap-2 cursor-pointer" onClick={toggleModal}>
                            {isUpdatePending ? (<SmallSpinner />) : (<small className="text-[16px]">Cancel</small>)}
                        </button>
                    </>

                    :

                    <button type="submit" disabled={isCreatePending} className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                        {isCreatePending ? (<SmallSpinner />) : (<small className="text-[16px]">Create Post</small>)}
                    </button>}

            </div>
        </form>
    )
}

export default CreatePostPage