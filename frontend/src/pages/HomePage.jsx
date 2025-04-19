
import PagePagination from '@/components/ui/PagePagination'
import BlogContainer from '@/components/ui/BlogContainer'
import Header from '@/components/ui/Header'
import { getBlogs } from '@/services/apiBlog'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'



const HomePage = () => {

    const [page, setPage] = useState(1)

    const { isPending, isError, error, data } = useQuery({
        queryKey: ['blogs', page],
        queryFn: () => getBlogs(page),
        placeholderData: keepPreviousData
    })

    const blogs = data?.results || [];

    function handleSetPage(val) {
        setPage(val)
    }

    function increasePageValue() {
        setPage(curr => curr + 1)
    }

    function decreasePageValue() {
        setPage(curr => curr - 1)
    }

    return (
        <div>
            <Header />
            <BlogContainer isPending={isPending} blogs={blogs} />
            <PagePagination page={page} numOfPages={data?.num_pages} handleSetPage={handleSetPage} increasePageValue={increasePageValue} decreasePageValue={decreasePageValue} />
        </div>
    )
}

export default HomePage