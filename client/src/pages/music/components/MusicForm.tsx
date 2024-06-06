import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Textarea } from '@/components/ui/textarea';
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { musicSchema } from "@/schema/music.schema";
import { genres } from "@/types/types";
import { capitalizeFirstLetter } from "@/lib/utils/capitalizeFirstLetter";

interface MusicFormProps {
    defaultValues: z.infer<typeof musicSchema>;
    isPending: boolean;
    isError?: boolean;
    onSubmit: (values: z.infer<typeof musicSchema>) => void;
}

function MusicForm({ isPending, defaultValues, onSubmit }: MusicFormProps) {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof musicSchema>>({
        resolver: zodResolver(musicSchema),
        defaultValues: defaultValues,
    });
    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="grid  md:grid-cols-2 gap-6">
                            <FormField

                                control={form.control}
                                name="artist_id"
                                render={({ field }) => (
                                    <Input
                                        type="hidden"
                                        className="w-full"

                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="w-full"
                                                placeholder="eg. See You Again "
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="album_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Album Name </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="w-full"
                                                placeholder="eg. Day Light  "
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a genre" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {genres.map((genre, index) => (
                                                    <SelectItem value={genre} key={genre + index} ><span className="first-letter:uppercase">{capitalizeFirstLetter(genre)}</span></SelectItem>

                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                        </div>
                    </CardContent>
                    <div className="flex items-center gap-4 p-4">

                        <Button variant={"outline"} onClick={() => navigate(-1)}>
                            <span className="ml-2">Cancel</span>
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <LoaderCircle className="animate-spin" />}
                            <span className="ml-2">Submit</span>
                        </Button>
                    </div>
                </form>
            </Form>
        </section >
    );
}

export default MusicForm;
