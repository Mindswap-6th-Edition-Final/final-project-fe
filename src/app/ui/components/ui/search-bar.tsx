
'use client';
import { Search } from "lucide-react";
import { useRouter, redirect } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { revalidatePath } from "next/cache";


const SearchBar = ({
    placeholder,
    currentPage
}: {
    placeholder: string,
    currentPage: number
}) => {




//     // const searchParams = useSearchParams();
//     // const pathName = usePathname();
//     // const {replace} = useRouter();


    const router = useRouter();

    const handleSearch = useDebouncedCallback((placeholder: string) => {


        router.push(`/dashboard/all-courses/location/${placeholder}/courses`);

        //revalidatePath(`/dashboard/all-courses/location/${placeholder}/courses`);
        redirect(`/dashboard/all-courses/location/${placeholder}/courses`);

    }, 500);


    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input className="peer block w-1/2 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
             
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
};



export default SearchBar

