import { Card } from "@/components/ui/card"
import { getArtistsCount, getUsersCount } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {

    // const { data: usersCount, isLoading: usersLoading, error: usersError } = useQuery('usersCount', getUsersCount);
    // const { data: musicsCount, isLoading: musicsLoading, error: musicsError } = useQuery('musicsCount', getMusicsCount);
    // const { data: artistsCount, isLoading: artistsLoading, error: artistsError } = useQuery('artistsCount', getArtistsCount);

    // if (usersLoading || musicsLoading || artistsLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (usersError || musicsError || artistsError) {
    //     return <div>Error fetching data</div>;
    // }

    const {
        isLoading: usersLoading,
        isError: usersError,
        data: userResponse,
    } = useQuery({
        queryKey: ["usersCount"],
        queryFn: getUsersCount,
    });
    const {
        isLoading: artistsLoading,
        isError: artistsError,
        data: artistsResponse,

    } = useQuery({
        queryKey: ["artistCount"],
        queryFn: getArtistsCount,
    });
    const {
        isLoading: musicsLoading,
        isError: musicsError,
        data: musicResponse,

    } = useQuery({
        queryKey: ["musicsCount"],
        queryFn: getArtistsCount,
    });


    const userCount = userResponse?.data?.data?.count;
    const artistCount = artistsResponse?.data?.data?.count;
    const musicsCount = musicResponse?.data?.data?.count;

    if (usersLoading || musicsLoading || artistsLoading) {
        return <div>Loading...</div>;
    }

    if (usersError || musicsError || artistsError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-900 text-white py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Welcome to the Dashboard</h1>
                        <p className="mt-4 text-lg text-gray-300">Gain insights into your artist management system's performance.</p>
                    </div>
                </div>
            </header>
            <main className="flex-1 py-8 md:py-12 lg:py-16">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-500 rounded-full p-3">
                                    <UsersIcon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">{userCount}</div>
                                    <div className="text-gray-500">Users</div>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="flex items-center gap-4">
                                <div className="bg-green-500 rounded-full p-3">
                                    <Music2Icon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">1{musicsCount}</div>
                                    <div className="text-gray-500">Music Tracks</div>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-500 rounded-full p-3">
                                    <UsersIcon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">{artistCount}</div>
                                    <div className="text-gray-500">Artists</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Music2Icon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="18" r="4" />
            <path d="M12 18V2l7 4" />
        </svg>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UsersIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}