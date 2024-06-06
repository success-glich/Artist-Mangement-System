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
import { getMusic, updateMusic } from "@/http/api";
import { Music } from "@/types/types";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { musicSchema } from "@/schema/music.schema";
import MusicForm from "./components/MusicForm";

function EditMusicPage() {
    const params = useParams();
    const { musicId } = params;

    const navigate = useNavigate();
    const {
        isLoading,
        isError,
        data: response,
        error,
    } = useQuery({
        queryKey: ["musics-info", musicId],
        queryFn: () => getMusic(Number(musicId)),
    });
    const musics: Music = response?.data.data;

    const { toast } = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateMusic,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["users-info"] });
            toast({
                variant: "success",
                title: res.data.message,
            });
            navigate(-1);
        },
    });

    function onSubmit(values: z.infer<typeof musicSchema>) {
        // ✅ This will be type-safe and validated.
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("album_name", values.album_name);
        formData.append("genre", values.genre);
        mutation.mutate({ id: Number(musicId), data: formData });
    }

    const defaultValues: Omit<z.infer<typeof musicSchema>, "artist_id"> = {
        title: musics?.title,
        genre: musics?.genre,
        album_name: musics?.album_name,
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
                            <BreadcrumbLink >
                                <Link to="/dashboard/home">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink >
                                <Link to="/dashboard/artists" >Artists</Link></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => navigate(-1)} className="cursor-pointer">Musics</BreadcrumbLink>
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
                    <CardTitle>Update a music</CardTitle>
                    <CardDescription>
                        Fill out the form below to update a music.
                        <br />
                        {mutation.isError && (
                            <div className="text-red-500">Something went wrong</div>
                        )}
                    </CardDescription>
                </CardHeader>

                <MusicForm
                    isPending={mutation.isPending}
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                />
            </Card>
        </section>
    );
}

export default EditMusicPage;
