import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { register } from "@/http/api"
import { useMutation } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

function RegisterPage() {
    const nameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (res) => {
            toast({
                variant: "success",
                title: res.data.message,
            });
            navigate("/auth/login");

        }
    });
    const handleRegister = () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value;
        if (!username || !password || !name) {
            return toast({
                variant: "destructive",
                title: "Please fill all the fields"
            })
        }

        mutation.mutate({ username, password, name });

    }

    return (
        <div className="container h-screen flex items-center justify-center ">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your email below to sign up.
                        <br />
                        {mutation.isError && <span className="text-sm text-red-500">something went wrong</span>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input ref={nameRef} id="name" type="name" placeholder="Jack Wilson" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input ref={usernameRef} id="username" type="username" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input ref={passwordRef} id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full  text-center ">

                        <Button className="w-full" onClick={handleRegister} disabled={mutation.isPending}>
                            {mutation.isPending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            {mutation.isPending ? "Processing..." : "Register"}</Button>
                        <div className="text-sm mt-4">
                            Already have an account ?{" "}
                            <Link to="/auth/login" className="underline">
                                Sign In
                            </Link>
                        </div>

                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RegisterPage