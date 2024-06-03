import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
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
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

const UserPage = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        // staleTime: 6 * 1000// in milliseconds
    });
    // console.log("data", data?.data.data.users);
    const users = data?.data.data.users;
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
                        <Button size="sm" className="h-7 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add User
                            </span>
                        </Button>
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
                                        <TableHead className="hidden md:table-cell">Date of birth</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Created at
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Updated at
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                    {users?.map((user: User, index: number) => (
                                        <TableRow key={user.id}>
                                            {/* <TableCell className="hidden sm:table-cell">
                                                <img
                                                    alt="Product image"
                                                    className="aspect-square rounded-md object-cover"
                                                    height="64"
                                                    src="/placeholder.svg"
                                                    width="64"
                                                />
                                            </TableCell> */}
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell >
                                                {user.first_name}
                                            </TableCell>
                                            <TableCell >
                                                {user.last_name}
                                            </TableCell>
                                            <TableCell >
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                {user.phone}
                                            </TableCell>
                                            <TableCell>{user.address}</TableCell>
                                            <TableCell className="hidden md:table-cell">{formatDate(user.dob.toString())}</TableCell>
                                            <TableCell>{formatGender(user.gender)}</TableCell>

                                            <TableCell className="hidden md:table-cell">{formatDate(user?.created_at?.toString() || "")}</TableCell>
                                            <TableCell className="hidden md:table-cell">{formatDate(user?.updated_at?.toString() || "")}</TableCell>

                                            <TableCell>
                                                <DropdownMenu>
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
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>1-10</strong> of <strong>32</strong> products
                            </div>
                        </CardFooter>
                    </Card>
                </section>
            </div>
        </>
    );
};

export default UserPage;
