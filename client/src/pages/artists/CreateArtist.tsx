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
import { createArtist } from "@/http/api";
import { useToast } from "@/components/ui/use-toast";
import ArtistFrom from "./components/ArtistForm";
import { artistSchema } from "@/schema/artist.schema";

const defaultValues: z.infer<typeof artistSchema> = {
    name: "",
    gender: "m",
    address: "",
    dob: "",
    first_release_year: "",
    no_of_albums_released: "",
};
function CreateArtist() {
    const navigate = useNavigate();

    const { toast } = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createArtist,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["artists"] });
            toast({
                variant: "success",
                title: res.data.message,
            });
            console.log("Artist created successfully");
            navigate("/dashboard/artists");
        },
    });

    function onSubmit(values: z.infer<typeof artistSchema>) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("dob", values.dob);
        formData.append("gender", values.gender);
        formData.append("address", values?.address || "");
        formData.append("first_release_year", values.first_release_year);
        formData.append("no_of_albums_released", values.no_of_albums_released);

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
                                <Link to="/dashboard/artists">Artists</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-4">
                    <Link to="/dashboard/artists">
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
                    <CardTitle>Create a new artist</CardTitle>
                    <CardDescription>
                        Fill out the form below to create a new artists.
                        <br />
                        {mutation.isError && (
                            <div className="text-red-500">Something went wrong</div>
                        )}
                    </CardDescription>
                </CardHeader>

                <ArtistFrom
                    isPending={mutation.isPending}
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                />
            </Card>
        </section>
    );
}

export default CreateArtist;
