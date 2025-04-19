import { BASE_URL } from "@/api"
import { FormatDate } from "@/services/formatDate"
import { Link } from "react-router-dom"

const CardFooter = ({ author, posted_at }) => {
    return (
        <Link to={`/profile/${author.username}`}>
            <div className="flex items-center gap=4 ">
                <span className="flex items-center gap-2">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                            src={`${BASE_URL}${author.profile_picture}`}
                            className="c rounded-full w-full h-full object-cover"
                        />
                    </div>

                    <small className="text-[#97989F] text-[12px] font-semibold">
                        {author.first_name} {author.last_name}
                    </small>
                </span>

                <small className="text-[#97989F] text-[12px] font-semibold ml-3">
                    {FormatDate(posted_at)}
                </small>
            </div>
        </Link>
    )
}

export default CardFooter