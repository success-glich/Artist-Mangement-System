import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '@/http/api';
import { useToast } from '@/components/ui/use-toast';
import { getCurrentDate } from '@/lib/utils/currentDate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
    first_name: z.string().min(2, {
        message: 'first name must be at least 2 characters.',
    }),
    last_name: z.string().min(2, {
        message: 'last name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Invalid email address.',
    }).min(2, {
        message: 'email must be at least 2 characters.',
    }),
    phone: z
        .string()
        .regex(
            /^(\+977)?9\d{9}$/,
            'Invalid phone number format'
        ),
    password: z.string().min(6, {
        message: 'password must be at least 6 characters.',
    }),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format, should be YYYY-MM-DD.' }),
    gender: z.enum(['m', 'f', 'o']),
    address: z.string().max(255).optional()
});

const CreateBook = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            dob: "",
            password: "",
            gender: "m",
            address: ""
        },
    });
    const { toast } = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUser,
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

    function onSubmit(values: z.infer<typeof formSchema>) {
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

        mutation.mutate(formData);

        console.log(values);
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                    <BreadcrumbPage>Create</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard/users">
                                <Button variant={'outline'}>
                                    <span className="ml-2">Cancel</span>
                                </Button>
                            </Link>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending && <LoaderCircle className="animate-spin" />}
                                <span className="ml-2">Submit</span>
                            </Button>
                        </div>
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
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </section>
    );
};

export default CreateBook;
