import { z } from "zod";
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
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "@/http/api";
import { useToast } from "@/components/ui/use-toast";
import UserForm from "@/components/common/UserForm";
import { userSchema } from "@/schema/user.schema";

const defaultValues: z.infer<typeof userSchema> = {
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    password: "",
    gender: "m",
    phone: "",
    address: "",
};
function CreateUser() {
    const navigate = useNavigate();

    const { toast } = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast({
                variant: "success",
                title: res.data.message,
            });
            console.log("User created successfully");
            navigate("/dashboard/users");
        },
    });

    function onSubmit(values: z.infer<typeof userSchema>) {
        // ✅ This will be type-safe and validated.
        const formData = new FormData();
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("email", values.email);
        formData.append("dob", values.dob);
        formData.append("gender", values.gender);
        formData.append("address", values?.address || "");
        formData.append("password", values.password);
        formData.append("phone", values.phone);

        mutation.mutate(formData);

        console.log(values);
    }

    return (
        <section>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to="/dashboard/home">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to="/dashboard/users">Users</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-4">
                    <Link to="/dashboard/users">
                        <Button variant={"outline"}>
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
                        {mutation.isError && (
                            <div className="text-red-500">Something went wrong</div>
                        )}
                    </CardDescription>
                </CardHeader>

                <UserForm
                    isPending={mutation.isPending}
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                />
            </Card>
        </section>
    );
}

export default CreateUser;
