import { useEffect, useState } from "react";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingBag } from "lucide-react";
import { allOrders } from "@/api/api";
import Loading from "@/components/shared/Loading";
import { toast } from "sonner";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [status, setStatus] = useState<string>("");

  const fetchOrders = async () => {
    try {
      const res = await allOrders();
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setStatus(order.status || "pending");
    setEditOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const payload = {
        ...selectedOrder,
        status: status, // or any other fields you want to update
      };

      await fetch(`http://localhost:8080/orders/update/${selectedOrder.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setEditOpen(false);
      const result = await fetch("http://localhost:8080/orders/allDetails");
      const data = await result.json();
      setOrders(data);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <h2 className="font-bold text-xl w-full text-left">Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center">No Orders Available</div>
      ) : (
        <Table className="w-full bg-gray-50 p-4 rounded-md">
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Item Summary</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.userId + order.createdAt}>
                <TableCell>User {order.userId}</TableCell>
                <TableCell>
                  {(order.items || [])
                    .map((item: any) => `Product ${item.productId} x${item.qty}`)
                    .join(", ")}
                </TableCell>
                <TableCell>₹{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>N/A</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-2 border-cyan-600"
                    onClick={() => handleEdit(order)}
                  >
                    <ShoppingBag className="h-6 w-6 text-cyan-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      )}

      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialogContent>
          <form onSubmit={handleSave} className="space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Update Order Status</AlertDialogTitle>
            </AlertDialogHeader>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-semibold">{selectedOrder?.address || "N/A"}</p>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Save</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminOrders;
