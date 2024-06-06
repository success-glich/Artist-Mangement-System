import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteArtist } from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

function ArtistDeleteBtn({ id }: { id: number }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (artistId: number) => deleteArtist(artistId),
        onSuccess: () => {
            toast({
                variant: "destructive",
                title: "Artist Deleted successfully !",
            });
            queryClient.invalidateQueries({ queryKey: ["artists"] });
        },
        onError: (error: never) => {
            console.error("Failed to delete artists:", error);
        },
    });
    const handleDelete = () => {
        deleteMutation.mutate(id);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="flex items-center gap-2">
                    <Trash2
                        size={20}
                        className="text-red-500 hover:scale-125 cursor-pointer transition-all"
                    />
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If this artist deleted then you can't recover it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-400"
                        onClick={handleDelete}
                    >
                        Yes, delete it
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ArtistDeleteBtn;
