import UserForm from "@/components/common/UserForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getUser, updateUser } from "@/http/api";
import { formatDate } from "@/lib/utils/formatDate";
import { userSchema } from "@/schema/user.schema";
import { User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
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
            console.log('User created successfully');
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

        // if (user) {
        //     return mutation.mutate(user.id, formData);
        // }
        mutation.mutate({ id: Number(userId), data: formData });


        console.log(values);
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
                            <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/users">Users</BreadcrumbLink>
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
                    <CardTitle>Create a new users</CardTitle>
                    <CardDescription>
                        Fill out the form below to create a new user.
                        <br />
                        {mutation.isError && <div className='text-red-500'>Something went wrong</div>}
                    </CardDescription>
                </CardHeader>
                {/* <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="w-full" placeholder='eg. john' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="w-full" placeholder='eg. doe' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="w-full" placeholder='eg. 9823342312'{...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" className="w-full" placeholder='eg. johndoe@gmail.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" className="w-full" {...field} max={getCurrentDate()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="m">Male</SelectItem>
                                            <SelectItem value="f">Female</SelectItem>
                                            <SelectItem value="o">Other</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="w-full" placeholder='eg. lalitpur, patandhoka' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent> */}

                <UserForm isPending={mutation.isPending} defaultValues={defaultValues} onSubmit={onSubmit} />
            </Card>

        </section >
    )
}

export default EditUserPage;
