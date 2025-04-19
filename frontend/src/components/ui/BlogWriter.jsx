import { BASE_URL } from "@/api"
import pic from "../../images/pic.jpg"
import { FormatDate } from "@/services/formatDate"
import { Link } from "react-router-dom"

const BlogWriter = ({ author, posted_at }) => {
    return (
        <div className="flex items-center gap=4 ">


            <span className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <img
                        src={`${BASE_URL}${author.profile_picture}`}
                        className="c rounded-full w-full h-full object-cover"
                    />
                </div>
                <Link to={`/profile/${author.username}`}>
                    <small className="text-[#696A75] text-[14px]">
                        {author.first_name} {author.last_name}
                    </small>
                </Link>

            </span>

            <small className="text-[#696A75] text-[14px] ml-3">
                {FormatDate(posted_at)}
            </small>


        </div>
    )
}

export default BlogWriter