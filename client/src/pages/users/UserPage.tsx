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
import { getUsers } from "@/http/api";
import { formatDate } from "@/lib/utils/formatDate";
import { formatGender } from "@/lib/utils/formatGender";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Edit2, File, ListFilter, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserDeleteBtn from "./components/UserDeleteBtn";
import { User } from "@/types/types";

function UserPage() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { isPending, isError, error, data, isFetching, isPlaceholderData } =
        useQuery({
            queryKey: ["users", page],
            queryFn: () => getUsers(page),
            placeholderData: keepPreviousData,
        });
    const limit = 5;
    const users = data?.data.users || [];
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
                                <BreadcrumbLink>

                                    <Link to="/dashboard/home">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Users</BreadcrumbPage>
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
                        <Link to="/dashboard/users/create">
                            <Button size="sm" className="h-7 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add User
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <section>
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>
                                Manage your users and view their interest .
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sn</TableHead>
                                        <TableHead>First name</TableHead>
                                        <TableHead>Last name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Date of birth
                                        </TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Created at
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Updated at
                                        </TableHead>
                                        <TableHead>Action</TableHead>
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

                                    {users?.map((user: User, index: number) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.first_name}</TableCell>
                                            <TableCell>{user.last_name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>{user.address}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(user.dob.toString())}
                                            </TableCell>
                                            <TableCell>{formatGender(user.gender)}</TableCell>

                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(user?.created_at?.toString() || "")}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatDate(user?.updated_at?.toString() || "")}
                                            </TableCell>

                                            <TableCell className="flex gap-2 items-center">
                                                {/* <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => navigate(`edit/${user.id}`)} className="flex items-center"><Edit2
                                                            size={20}
                                                            className="text-blue-500 hover:scale-125 cursor-pointer transition-all"
                                                        /> </DropdownMenuItem>

                                                    </DropdownMenuContent>


                                                </DropdownMenu> */}
                                                <div
                                                    onClick={() => navigate(`edit/${user.id}`)}
                                                    className="flex items-center"
                                                >
                                                    <Edit2
                                                        size={20}
                                                        className="text-blue-500 hover:scale-125 cursor-pointer transition-all"
                                                    />{" "}
                                                </div>
                                                <UserDeleteBtn id={user.id} />
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
                                    {/* {renderPaginationItems()} */}
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

export default UserPage;
