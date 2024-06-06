import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getArtist, updateArtist } from "@/http/api";
import { artistSchema } from "@/schema/artist.schema";
import { Artist } from "@/types/types";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import ArtistForm from "./components/ArtistForm";
import { formatDate } from "@/lib/utils/formatDate";

function EditArtistPage() {
    const params = useParams();
    const { artistId } = params;

    const navigate = useNavigate();
    const {
        isLoading,
        isError,
        data: response,
        error,
    } = useQuery({
        queryKey: ["artists", artistId],
        queryFn: () => getArtist(Number(artistId)),
    });
    const artist: Artist = response?.data.data;

    const { toast } = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateArtist,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast({
                variant: "success",
                title: res.data.message,
            });
            navigate("/dashboard/artists");
        },
    });

    function onSubmit(values: z.infer<typeof artistSchema>) {
        // ✅ This will be type-safe and validated.
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("dob", values.dob);
        formData.append("gender", values.gender);
        formData.append("address", values?.address || "");
        formData.append("first_release_year", values.first_release_year);
        formData.append("no_of_albums_released", values.no_of_albums_released);

        mutation.mutate({ id: Number(artistId), data: formData });

    }

    const defaultValues: z.infer<typeof artistSchema> = {
        name: artist?.name,
        gender: artist?.gender,
        address: artist?.address,
        dob: formatDate(artist?.dob),
        first_release_year: String(artist?.first_release_year),
        no_of_albums_released: String(artist?.no_of_albums_released),
    };
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
                            <BreadcrumbPage>Update</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Update a artist</CardTitle>
                    <CardDescription>
                        Fill out the form below to update a artist.
                        <br />
                        {mutation.isError && (
                            <div className="text-red-500">Something went wrong</div>
                        )}
                    </CardDescription>
                </CardHeader>

                <ArtistForm
                    isPending={mutation.isPending}
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                />
            </Card>
        </section>
    );
}

export default EditArtistPage;
