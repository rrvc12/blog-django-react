import Badge from "@/components/ui/Badge"
import BlogWriter from "@/components/ui/BlogWriter"
import banner from "../images/detailBanner.jpg"
import { deleteBlog, getBlog } from "@/services/apiBlog"
import { useNavigate, useParams } from "react-router"
import { useMutation, useQuery } from "@tanstack/react-query"
import Spinner from "@/components/ui/Spinner"
import { BASE_URL } from "@/api"
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/ui/Modal"
import CreatePostPage from "./CreatePostPage"
import { useState } from "react"
import { toast } from "react-toastify"


const DetailPage = ({ username, isAuthenticated }) => {

    const { slug } = useParams()
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    function toggleModal() {
        // niega el valor de showModal
        setShowModal(curr => !curr)
    }

    const { isPending, isError, error, data } = useQuery({
        queryKey: ["blog", slug],
        queryFn: () => getBlog(slug)
    })

    const blogId = data?.id

    const { mutate: deleteMutate } = useMutation({
        mutationFn: (id) => deleteBlog(id),
        onSuccess: () => {
            toast.success("Your pust has been deleted successfully!")
            navigate("/")
        },
        onError: (err) => {
            console.log(err)
            toast.error(err.message)
        }
    })

    function handleDeleteBlog() {
        const popUp = window.confirm("Are you sure you want to delete this posts?")
        if (!popUp) {
            return;
        }
        deleteMutate(blogId)
    }

    if (isPending) {
        return <Spinner />
    }

    console.log(data)

    return (
        <>
            <div className="padding-dx max-container py-9">
                <div className="flex gap-2">
                    {data.categories?.map((category) => <Badge key={category.id} category={category} />
                    )}
                </div>



                <div className="flex justify-between items-center">
                    <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
                        {data.title}
                    </h2>

                    {isAuthenticated && username === data.author.username &&
                        <span className="flex justify-between items-center gap-2">
                            <HiPencilAlt className="dark:text-white text-3x1 cursor-pointer" onClick={toggleModal} />

                            <MdDelete onClick={handleDeleteBlog} className="dark:text-white text-3x1 cursor-pointer" />

                        </span>
                    }
                </div>

                <BlogWriter author={data.author} posted_at={data.posted_at} />

                <div className="w-full h-[350px] my-9 overflow-hidden rounded-sm">
                    <img className="w-full h-full object-cover rounded-sm" src={`${BASE_URL}${data.featured_image}`} />
                </div>
                <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
                    {data.content}
                </p>
            </div>

            {showModal && <Modal>
                <CreatePostPage blog={data} toggleModal={toggleModal} />
            </Modal>}
        </>

    )
}

export default DetailPage