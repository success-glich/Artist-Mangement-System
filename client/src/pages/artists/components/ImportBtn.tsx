import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { importArtists } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { FileArchive } from "lucide-react";
import { useRef } from "react";

function ImportBtn() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { toast } = useToast();

    const importMutation = useMutation({
        mutationFn: importArtists,

        onSuccess: () => {
            toast({
                title: "Artists imported successfully",
                variant: "success",
            });
        },
        onError: (error) => {
            console.error("Error import file:", error);
            toast({
                title: "Error",
                description: "Error to import file.",
                variant: "destructive",
            });
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check if the file is a CSV
            if (file.type === "text/csv") {
                importMutation.mutate(file);
            } else {
                toast({
                    title: "Invalid File Type",
                    description: "Please upload a CSV file.",
                    variant: "destructive",
                });
            }
        }
    };
    const handleImport = () => {
        fileInputRef.current?.click();
    };

    return (
        <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1"
            onClick={handleImport}
        >
            <FileArchive className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Import
            </span>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </Button>
    );
}

export default ImportBtn;
