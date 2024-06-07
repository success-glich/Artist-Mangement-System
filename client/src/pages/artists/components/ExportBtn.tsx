import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import { exportArtists } from '@/http/api';
import { useMutation } from '@tanstack/react-query';
import { File } from 'lucide-react'

function ExportBtn() {
    const { toast } = useToast();
    const exportMutation = useMutation({
        mutationFn: exportArtists,

        onSuccess: (res) => {
            console.log(res);
            const url = window.URL.createObjectURL(new Blob([res?.data as unknown as BlobPart]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'artists.csv');
            document.body.appendChild(link);
            link.click();
        },
        onError: (error) => {
            console.error('Error downloading file:', error);
            toast({
                title: 'Error',
                description: 'Error downloading file.',
                variant: 'destructive',
            })
        },

    });
    const handleDownload = () => {
        exportMutation.mutate();
    }
    return (
        <Button size="sm" variant="outline" className="h-7 gap-1" onClick={handleDownload}>
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
            </span>
        </Button>
    )
}

export default ExportBtn