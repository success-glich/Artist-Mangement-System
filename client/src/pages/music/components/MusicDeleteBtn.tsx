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
import { deleteMusic } from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

function MusicDeleteBtn({ id }: { id: number }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (musicId: number) => deleteMusic(musicId),
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Music Deleted successfully !",
            });
            queryClient.invalidateQueries({ queryKey: ["musics"] });
        },
        onError: (error: never) => {
            console.error("Failed to delete musics:", error);
            toast({
                variant: "destructive",
                title: "Failed to delete music !",
            });
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
                        If this musics deleted then you can't recover it.
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

export default MusicDeleteBtn;
