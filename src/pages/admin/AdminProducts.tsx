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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loading from "@/components/shared/Loading";
import { toast } from "sonner";
import type { AdminProductType, ProductType } from "@/types";
import { addProduct, allProducts, deleteProduct } from "@/api/api";

const AdminProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [editForm, setEditForm] = useState<ProductType | null>(null);
  const [category, setCategory] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  // Fetch products
  const fetchData = async () => {
    try {
      const response = await allProducts();
      if (response.status === 200 && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        toast.error("Failed to fetch products. Received unexpected data.");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error Fetching Data:", error);
      toast.error("Error fetching products!");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add product
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: AdminProductType = {
      name: nameRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      category,
      tags: tagsRef.current?.value || "",
      price: Number(priceRef.current?.value) || 0,
      stock: Number(stockRef.current?.value) || 0,
      image: imageRef.current?.value || "",
    };
    try {
      const response = await addProduct(newProduct);
      if (response.status === 200) {
        toast.success("Product Added!");
        fetchData();
        setAddOpen(false);
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error("Error adding product!");
    }
  };

  // Save edited product
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    try {
      const response = await fetch(`http://localhost:8080/products/edit/${editForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editForm,
          price: Number(editForm.price),
          stock: Number(editForm.stock),
        }),
      });

      if (response.ok) {
        toast.success("Product Updated!");
        fetchData();
        setEditOpen(false);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Update Product Error:", error);
      toast.error("Error updating product!");
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      const response = await deleteProduct(selectedProduct.id);
      if (response.status === 200) {
        toast.success("Product Deleted!");
        fetchData();
        setDeleteOpen(false);
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Delete Product Error:", error);
      toast.error("Error deleting product!");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 flex justify-center items-center w-full flex-col gap-4">
      {/* Header */}
      <div className="w-full flex flex-row">
        <div className="w-1/2 flex justify-start items-center">
          <h2 className="font-bold">Products</h2>
        </div>
        <div className="w-1/2 flex justify-end items-center">
          <Button
            variant="outline"
            className="border-2 border-green-500 text-green-500"
            onClick={() => setAddOpen(true)}
          >
            <Plus className="h-8 w-8 mr-2" /> Add Product
          </Button>
        </div>
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <div className="text-center">No Products Available</div>
      ) : (
        <Table className="w-full bg-gray-50 p-4 rounded-md">
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img src={product.image} alt={product.name} className="rounded-full h-6 w-6" />
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.tags}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    className="border-2 border-blue-600"
                    onClick={() => {
                      setEditForm(product);
                      setEditOpen(true);
                    }}
                  >
                    <Pencil className="h-6 w-6 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-red-600"
                    onClick={() => {
                      setSelectedProduct(product);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash className="h-6 w-6 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Add Modal */}
      <AlertDialog open={addOpen} onOpenChange={setAddOpen}>
        <AlertDialogContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Add Product</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input ref={nameRef} placeholder="Product Name" />
              <Label>Image URL</Label>
              <Input ref={imageRef} placeholder="https://..." />
              <Label>Description</Label>
              <Input ref={descriptionRef} placeholder="Description" />
              <Label>Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="ELECTRONICS">ELECTRONICS</SelectItem>
                    <SelectItem value="FURNITURE">FURNITURE</SelectItem>
                    <SelectItem value="HOME">HOME</SelectItem>
                    <SelectItem value="FASHION">FASHION</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label>Price</Label>
              <Input ref={priceRef} type="number" />
              <Label>Stock</Label>
              <Input ref={stockRef} type="number" />
              <Label>Tags</Label>
              <Input ref={tagsRef} placeholder="tags" />
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

      {/* Edit Modal */}
      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialogContent>
          <form onSubmit={handleSave} className="space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Product</AlertDialogTitle>
            </AlertDialogHeader>
            {editForm && (
              <div className="grid gap-3">
                <Label>Name</Label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
                <Label>Image URL</Label>
                <Input
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                />
                <Label>Description</Label>
                <Input
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
                <Label>Category</Label>
                <Select
                  value={editForm.category}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, category: value as AdminProductType["category"] })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="ELECTRONICS">ELECTRONICS</SelectItem>
                      <SelectItem value="FURNITURE">FURNITURE</SelectItem>
                      <SelectItem value="HOME">HOME</SelectItem>
                      <SelectItem value="FASHION">FASHION</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: Number(e.target.value) })
                  }
                />
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={editForm.stock}
                  onChange={(e) =>
                    setEditForm({ ...editForm, stock: Number(e.target.value) })
                  }
                />
                <Label>Tags</Label>
                <Input
                  value={editForm.tags}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                />
              </div>
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

      {/* Delete Modal */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <span className="font-bold">{selectedProduct?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;
