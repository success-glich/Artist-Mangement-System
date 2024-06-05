import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getArtists } from "@/http/api";
import { formatDate } from "@/lib/utils/formatDate";
import { formatGender } from "@/lib/utils/formatGender";
import { Artist } from "@/types/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Edit2, File, ListFilter, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArtistDeleteBtn from "./components/ArtistDeleteBtn";

function ArtistPage() {

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { isPending, isError, error, data, isFetching, isPlaceholderData } =
        useQuery({
            queryKey: ["artists", page],
            queryFn: () => getArtists(page),
            placeholderData: keepPreviousData,
        });
    const limit = 5;
    const artists = data?.data.artists || [];
    const total = data?.data.total || 0;
    const totalPages = Math.ceil(total / limit);


    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div>
                <div className="flex items-center">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Artists</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="ml-auto flex items-center gap-2 mb-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-7 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Link to="/dashboard/artists/create">
                            <Button size="sm" className="h-7 gap-1" >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Artist
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <section>
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Artists</CardTitle>
                            <CardDescription>
                                Manage your artists and view their interest .
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sn</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Address</TableHead>

                                        <TableHead>First Release Year</TableHead>
                                        <TableHead>Number of Album</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Date of birth
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Created at
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Updated at
                                        </TableHead>


                                        <TableHead>
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isPending && (
                                        <TableRow>
                                            <TableCell colSpan={11} className="text-center">
                                                Loading.....
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {artists && artists.length > 0 && artists?.map((artist: Artist, index: number) => (

                                        <TableRow key={artist.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{artist.name}</TableCell>
                                            <TableCell>{formatGender(artist?.gender)}</TableCell>
                                            <TableCell>{artist.address}</TableCell>
                                            <TableCell>{artist.first_release_year}</TableCell>
                                            <TableCell>{artist.no_of_albums_released}</TableCell>
                                            {/* <TableCell>{artist.address}</TableCell> */}
                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(artist?.dob.toString())}
                                            </TableCell>

                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(artist?.created_at?.toString() || "")}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(artist?.updated_at?.toString() || "")}
                                            </TableCell>

                                            <TableCell className="flex gap-2 items-center">

                                                <div onClick={() => navigate(`edit/${artist.id}`)} className="flex items-center"><Edit2
                                                    size={20}
                                                    className="text-blue-500 hover:scale-125 cursor-pointer transition-all"
                                                /> </div>
                                                {/* <UserDeleteBtn id={user.id} />
                                                 */}

                                                <ArtistDeleteBtn id={artist.id} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            className={`${page === 1 ? "pointer-events-none opacity-50" : ""
                                                }`}
                                            onClick={() => setPage((old) => Math.max(old - 1, 0))}
                                            isActive={page === 0}
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            className={`${page === totalPages
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                                }`}
                                            onClick={() => {
                                                console.log(data);
                                                console.log({ page, totalPages });

                                                if (!isPlaceholderData && data.data.total !== page) {
                                                    setPage((old) => old + 1);
                                                }
                                            }}
                                            isActive={isPlaceholderData || page === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            {isFetching ? <span> Loading...</span> : null}
                        </CardFooter>
                    </Card>
                </section>
            </div>
        </>
    );
}

export default ArtistPage;
