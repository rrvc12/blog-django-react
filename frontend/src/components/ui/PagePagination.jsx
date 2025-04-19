import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PagePagination = ({ page, numOfPages, handleSetPage, increasePageValue, decreasePageValue }) => {

    const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1)

    const firstNumber = numbers[0]
    const lastNumber = numbers[numbers.length - 1]

    return (
        <Pagination className="my-6 dark:text-white">
            <PaginationContent>

                {page === firstNumber || (
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={decreasePageValue} />
                    </PaginationItem>
                )}

                {numbers.map((num) => (

                    <PaginationItem key={num} onClick={() => handleSetPage(num)}>
                        <PaginationLink href="#" isActive={num === page}>
                            {num}
                        </PaginationLink>

                    </PaginationItem>)

                )}
                {page === lastNumber || (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={increasePageValue} />
                    </PaginationItem>
                )}


            </PaginationContent>
        </Pagination>
    )
}

export default PagePagination