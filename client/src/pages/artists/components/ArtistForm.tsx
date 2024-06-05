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
import { Link } from "react-router-dom";
import { getCurrentDate } from "@/lib/utils/currentDate";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { artistSchema } from "@/schema/artist.schema";

interface ArtistFormProps {
    defaultValues: z.infer<typeof artistSchema>;
    isPending: boolean;
    isError?: boolean;
    onSubmit: (values: z.infer<typeof artistSchema>) => void;
}

function ArtistFrom({ isPending, defaultValues, onSubmit }: ArtistFormProps) {
    const form = useForm<z.infer<typeof artistSchema>>({
        resolver: zodResolver(artistSchema),
        defaultValues: defaultValues,
    });
    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="w-full"
                                                placeholder="eg. Arjit Sing"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="w-full"
                                                placeholder="eg. doe"
                                                {...field}
                                            />
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
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
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
                                name="dob"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                className="w-full"
                                                {...field}
                                                max={getCurrentDate()}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="first_release_year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Year of Release</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="w-full"
                                                placeholder="eg. doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="no_of_albums_released"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of album released</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="w-full" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                    </CardContent>
                    <div className="flex items-center gap-4 p-4">
                        <Link to="/dashboard/artists">
                            <Button variant={"outline"}>
                                <span className="ml-2">Cancel</span>
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <LoaderCircle className="animate-spin" />}
                            <span className="ml-2">Submit</span>
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
}

export default ArtistFrom;
