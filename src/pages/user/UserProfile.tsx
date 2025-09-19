import { getUserByID } from "@/api/api"
import Loading from "@/components/shared/Loading"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Key, Pencil } from "lucide-react"
import { useEffect, useState } from "react"

const UserProfile = () => {
    const [user, setUser] = useState({
        "id": "",
        "name": "",
        "email": "",
        "password": "",
        "street": "",
        "city": "",
        "zip": "",

    })

    const [loading, setLoading] = useState(true)
    const uid: string = "68c525ff9e74d26f815bf7ac"
    const fetchUser = async () => {
        try {
            const response = await getUserByID(uid)
            if (response.status === 200) {
                setUser(response.data)
                setLoading(false)
            }
        } catch (error) {
            console.error("Error Fetching Data !")
        } finally {
            setLoading(false)
        }
    }


    if (loading) {
        <Loading />
    }
    useEffect(() => {
        fetchUser()
    }, [])


    const [editOpen, setEditOpen] = useState(false)
    const [passOpen, setPassOpen] = useState(false)
    return (
        <div className="p-4 flex justify-center items-center w-full h-[95svh]">

            <Card className="h-[55vh] w-[25vw]">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardAction>
                        <Button className="border-2 border-blue-600 cursor-pointer" variant='outline' onClick={() => { setEditOpen(true) }}>
                            <Pencil className="h-8 w-8 text-blue-600" />
                        </Button>
                        <Button className="ml-2 border-2 border-orange-600 cursor-pointer" variant='outline' onClick={() => { setPassOpen(true) }}>
                            <Key className="h-8 w-8 text-orange-600" />
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-start gap-2">
                    <span>Name :</span>
                    <p className="font-bold text-2xl">{user.name}</p>
                    <span>Email :</span>
                    <p className="font-bold text-2xl">{user.email}</p>
                    <span>Street :</span>
                    <p className="font-bold text-2xl">{user.street}</p>
                    <span>City :</span>
                    <p className="font-bold text-2xl">{user.city}</p>
                    <span>Zip :</span>
                    <p className="font-bold text-2xl">{user.zip}</p>
                </CardContent>
            </Card>

            <Dialog open={editOpen}>
                <form>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" defaultValue="User" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" defaultValue="user@gmail.com" disabled />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" defaultValue="1234567890" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="street">Street</Label>
                                <Input id="street" name="street" defaultValue="ABC" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" defaultValue="CDE" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="zip">Zip</Label>
                                <Input id="zip" name="zip" defaultValue="123 567" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => { setEditOpen(false) }}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>

            <Dialog open={passOpen}>
                <form>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="cp">Current Password</Label>
                                <Input id="cp" name="cp" placeholder="******" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="np">New Password</Label>
                                <Input id="np" name="np" placeholder="New Password" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="cfp">Confirm Password</Label>
                                <Input id="cfp" name="cfp" placeholder="Confirm Password" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => { setPassOpen(false) }}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default UserProfile