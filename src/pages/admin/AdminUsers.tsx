import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/shared/Loading";
import { toast } from "sonner";
import { allUsers, addUser, editUser, deleteUser } from "@/api/api"; // define API functions
import type { UserType } from "@/types";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [editForm, setEditForm] = useState<UserType | null>(null);

  // Refs for add form
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const response = await allUsers();
      if (response.status === 200 && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        toast.error("Failed to fetch users.");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      street: streetRef.current?.value || "",
      city: cityRef.current?.value || "",
      zip: zipRef.current?.value || "",
    };

    try {
      const response = await addUser(newUser);
      if (response.status === 200) {
        toast.success("User Added!");
        fetchData();
        setAddOpen(false);
      } else {
        toast.error("Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user!");
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    try {
      const response = await editUser(editForm, editForm.id);
      if (response.status === 200) {
        toast.success("User Updated!");
        fetchData();
        setEditOpen(false);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user!");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      const response = await deleteUser(selectedUser.id);
      if (response.status === 200) {
        toast.success("User Deleted!");
        fetchData();
        setDeleteOpen(false);
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-bold">Users</h2>
        <Button variant="outline" onClick={() => setAddOpen(true)}>
          <Plus className="h-6 w-6 mr-2" /> Add User
        </Button>
      </div>

      {users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <Table className="w-full bg-gray-50 rounded-md">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Street</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Zip</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.street}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.zip}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-blue-500"
                    onClick={() => {
                      setEditForm(user);
                      setEditOpen(true);
                    }}
                  >
                    <Pencil className="h-5 w-5 text-blue-500" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500"
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash className="h-5 w-5 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Add User Dialog */}
      <AlertDialog open={addOpen} onOpenChange={setAddOpen}>
        <AlertDialogContent>
          <form onSubmit={handleAdd} className="grid gap-3">
            <AlertDialogHeader>
              <AlertDialogTitle>Add User</AlertDialogTitle>
            </AlertDialogHeader>
            <Label>Name</Label>
            <Input ref={nameRef} placeholder="Name" />
            <Label>Email</Label>
            <Input ref={emailRef} placeholder="Email" type="email" />
            <Label>Password</Label>
            <Input ref={passwordRef} placeholder="Password" type="password" />
            <Label>Street</Label>
            <Input ref={streetRef} placeholder="Street" />
            <Label>City</Label>
            <Input ref={cityRef} placeholder="City" />
            <Label>Zip</Label>
            <Input ref={zipRef} placeholder="Zip" />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Save</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit User Dialog */}
      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialogContent>
          <form onSubmit={handleEdit} className="grid gap-3">
            <AlertDialogHeader>
              <AlertDialogTitle>Edit User</AlertDialogTitle>
            </AlertDialogHeader>
            {editForm && (
              <>
                <Label>Name</Label>
                <Input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <Label>Email</Label>
                <Input
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
                <Label>Street</Label>
                <Input
                  value={editForm.street}
                  onChange={(e) =>
                    setEditForm({ ...editForm, street: e.target.value })
                  }
                />
                <Label>City</Label>
                <Input
                  value={editForm.city}
                  onChange={(e) =>
                    setEditForm({ ...editForm, city: e.target.value })
                  }
                />
                <Label>Zip</Label>
                <Input
                  value={editForm.zip}
                  onChange={(e) =>
                    setEditForm({ ...editForm, zip: e.target.value })
                  }
                />
              </>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Save</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete{" "}
              <span className="font-bold">{selectedUser?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsers;
