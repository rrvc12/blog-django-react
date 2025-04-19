import Badge from "./Badge"
import CardFooter from "./CardFooter"
import { Link } from "react-router-dom"
import { BASE_URL } from "@/api"

const BlogCard = ({ blog }) => {
    return (
        <div className="px-3 py-3 rounded-md w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
            <div className="w-full h-[200px] border rounded-md overflow-hidden">
                <img
                    src={`${BASE_URL}${blog.featured_image}`}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <span className="flex items-center gap-2">
                {blog.categories?.map((category) =>
                    <Badge key={category.id} category={category} />
                )}
            </span>


            <Link to={`/blogs/${blog.slug}`}>
                <h3 className="font-semibold  leading-normal text-[#181A2A] mb-0 dark:text-white">
                    {blog.title}
                </h3>
            </Link>

            <CardFooter author={blog.author} posted_at={blog.posted_at} />
        </div >
    )
}


export default BlogCard