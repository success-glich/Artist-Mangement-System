import { z } from "zod";
import {
    Breadcrumb,
    BreadcrumbItem,
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
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { createMusic } from "@/http/api";
import { useToast } from "@/components/ui/use-toast";
import { musicSchema } from "@/schema/music.schema";
import MusicForm from "./components/MusicForm";
import { genres } from "@/types/types";

const defaultValues: z.infer<typeof musicSchema> = {
    title: "",
    genre: genres[0],
    artist_id: "",
    album_name: "",

};
function CreateMusic() {
    const navigate = useNavigate();
    const { artistId } = useParams();

    const { toast } = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createMusic,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["musics"] });
            toast({
                variant: "success",
                title: res.data.message,
            });
            console.log("Music created successfully");
            // * go back to previous page
            navigate(-1);
        },
    });

    function onSubmit(values: z.infer<typeof musicSchema>) {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("album_name", values.album_name);
        formData.append("genre", values.genre);
        formData.append("artist_id", values.artist_id);

        mutation.mutate(formData);

    }
    if (artistId) {
        defaultValues.artist_id = artistId;
    } else {
        return <Navigate to="/not-found" />
    }
    return (
        <section>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to="/dashboard/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link to="/dashboard/artists" >Artists</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <Link to={`/dashboard/artists/${artistId}/musics`}>
                                Musics
                            </Link>

                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-4">
                    <Button variant={"outline"} onClick={() => navigate(-1)}>
                        <span className="ml-2">Cancel</span>
                    </Button>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && <LoaderCircle className="animate-spin" />}
                        <span className="ml-2">Submit</span>
                    </Button>
                </div>
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Create a new music</CardTitle>
                    <CardDescription>
                        Fill out the form below to create a new music.
                        <br />
                        {mutation.isError && (
                            <div className="text-red-500">Something went wrong</div>
                        )}
                    </CardDescription>
                </CardHeader>
                <MusicForm isPending={mutation.isPending} defaultValues={defaultValues} onSubmit={onSubmit} />

                {/* <ArtistFrom isPending={mutation.isPending} defaultValues={defaultValues} onSubmit={onSubmit} /> */}
            </Card>
        </section>
    );
}

export default CreateMusic;
