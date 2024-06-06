import UserForm from "@/pages/users/components/UserForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getUser, updateUser } from "@/http/api";
import { formatDate } from "@/lib/utils/formatDate";
import { userSchema } from "@/schema/user.schema";
import { User } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";



function EditUserPage() {


    const { userId } = useParams();
    const navigate = useNavigate();

    const {
        isLoading,
        isError,
        data: response,
        error,
    } = useQuery({
        queryKey: ["users", userId],
        queryFn: () => getUser(Number(userId)),
    });
    const user: User = response?.data.data;


    const { toast } = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                variant: "success",
                title: res.data.message,
            })
            navigate('/dashboard/users');
        },
    });

    function onSubmit(values: z.infer<typeof userSchema>) {
        // ✅ This will be type-safe and validated.
        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('dob', values.dob);
        formData.append('gender', values.gender);
        formData.append('address', values?.address || "");
        formData.append('password', values.password);
        formData.append('phone', values.phone);
        mutation.mutate({ id: Number(userId), data: formData });
    }

    const defaultValues = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        dob: formatDate(user?.dob),
        password: "",
        phone: user?.phone,
        gender: user?.gender,
        address: user?.address
    }
    if (isLoading) {
        return <div>loading...</div>;
    } else if (isError) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <section>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild><Link to="/dashboard/home">Home</Link></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild><Link to="/dashboard/users">Users</Link></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Update</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Update a users</CardTitle>
                    <CardDescription>
                        Fill out the form below to update a user.
                        <br />
                        {mutation.isError && <div className='text-red-500'>Something went wrong</div>}
                    </CardDescription>
                </CardHeader>

                <UserForm isPending={mutation.isPending} defaultValues={defaultValues} onSubmit={onSubmit} />
            </Card>

        </section >
    )
}

export default EditUserPage;
