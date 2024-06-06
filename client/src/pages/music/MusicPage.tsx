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
import { formatDate } from "@/lib/utils/formatDate";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Edit2, File, ListFilter, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import UserDeleteBtn from "./components/UserDeleteBtn";
import { Music } from "@/types/types";
import { getMusics } from "@/http/api";
import MusicDeleteBtn from "./components/MusicDeleteBtn";
import { capitalizeFirstLetter } from "@/lib/utils/capitalizeFirstLetter";

const MusicPage = () => {

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { artistId } = useParams();
    const { isPending, isError, error, data, isFetching, isPlaceholderData } =
        useQuery({
            queryKey: ["musics", page],
            queryFn: () => getMusics({ page, artistId: Number(artistId) }),
            placeholderData: keepPreviousData,
        });
    const limit = 5
    const musics = data?.data?.musics || [];
    const totalMusic = data?.data.total || 0;
    const totalPages = Math.ceil(totalMusic / limit);

    if (isPending) {
        return <div>Loading...</div>
    }

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
                                <BreadcrumbPage><BreadcrumbLink href="/dashboard/artists">Artist</BreadcrumbLink></BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Musics</BreadcrumbPage>
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
                        <Link to={`/dashboard/artists/${artistId}/musics/create`}>
                            <Button size="sm" className="h-7 gap-1" >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Music
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <section>
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Musics</CardTitle>
                            <CardDescription>
                                Manage  Musics and view musics .
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sn</TableHead>
                                        <TableHead>title</TableHead>
                                        <TableHead>album_name</TableHead>
                                        <TableHead>genre</TableHead>
                                        <TableHead>Artist Name</TableHead>

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
                                    {musics?.length < 1 ? <TableRow>
                                        <TableCell colSpan={11} className="text-center">
                                            Data Not Found
                                        </TableCell>
                                    </TableRow> : musics?.map((music: Music, index: number) => (
                                        <TableRow key={music.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{music.title}</TableCell>
                                            <TableCell>{music.album_name}</TableCell>
                                            <TableCell>{capitalizeFirstLetter(music.genre)}</TableCell>
                                            <TableCell>{music.artist_name}</TableCell>

                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(music?.created_at?.toString() || "")}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(music?.updated_at?.toString() || "")}
                                            </TableCell>

                                            <TableCell className="flex gap-2 items-center">

                                                <div onClick={() => navigate(`/dashboard/musics/edit/${music.id}`)} className="flex items-center"><Edit2
                                                    size={20}
                                                    className="text-blue-500 hover:scale-125 cursor-pointer transition-all"
                                                /> </div>
                                                <MusicDeleteBtn id={music.id} />

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
                                            className={`${page === totalPages || totalPages < 1
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                                }`}
                                            isActive={totalPages > 0 || isPlaceholderData || page === totalPages}

                                            onClick={() => {
                                                if (!isPlaceholderData && totalPages !== page && totalPages > 0) {
                                                    setPage((old) => old + 1);
                                                }
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            {isFetching ? <span> Loading...</span> : null}
                        </CardFooter>
                    </Card>
                </section>
            </div >
        </>
    );
}

export default MusicPage;
