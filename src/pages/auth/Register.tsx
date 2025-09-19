import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

const Register = () => {
    return (
        <div className="w-svw h-svh flex justify-center items-center">

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Register new account</CardTitle>
                    <CardDescription>
                        Enter your detials below to register to your account
                    </CardDescription>
                    <CardAction>
                        <Link to='/'>
                            <Button variant="link" >Sign In</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="User"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="street">Street</Label>
                                <Input
                                    id="street"
                                    type="text"
                                    placeholder="User Street"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    placeholder="User City"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">Zip Code</Label>
                                <Input
                                    id="zip code"
                                    type="text"
                                    placeholder="User Zip Code"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" placeholder="********" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Register