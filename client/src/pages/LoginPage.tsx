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
import { useRef } from "react"
import { Link } from "react-router-dom"

function LoginPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        // Perform login logic here
        console.log(`Logging in with email: ${username} and password: ${password}`);
    }

    return (
        <div className="container h-screen flex items-center justify-center ">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">username</Label>
                        <Input ref={usernameRef} id="username" type="username" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input ref={passwordRef} id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full  text-center ">
                        <Button className="w-full" onClick={handleLogin}>Sign in</Button>
                        <div className="text-sm mt-4">
                            New to our platform ?{" "}
                            <Link to="/register" className="underline">
                                Sign Up
                            </Link>
                        </div>

                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage