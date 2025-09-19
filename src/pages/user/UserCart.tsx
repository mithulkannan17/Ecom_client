import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {  Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
const UserCart = () => {
  return (
    <div className="p-4 flex flex-row justify-center items-start w-full gap-4">
      <div className="w-[60%]">
        <Table className="w-full bg-gray-50 p-4 rounded-md">
          <TableCaption className="font-bold text-lg">Toatal : 800</TableCaption>
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Phone 2</TableCell>
              <TableCell>Samsung</TableCell>
              <TableCell>SM1</TableCell>
              <TableCell>400</TableCell>
              <TableCell>40</TableCell>
              <TableCell>SM1</TableCell>
              <TableCell className="text-right">
                <Button className="border-2 border-red-600" variant='outline'>
                  <Trash2 className="h-8 w-8 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Phone 1</TableCell>
              <TableCell>Samsung</TableCell>
              <TableCell>SM1</TableCell>
              <TableCell>400</TableCell>
              <TableCell>40</TableCell>
              <TableCell>SM1</TableCell>
              <TableCell className="text-right">
                <Button className="border-2 border-red-600" variant='outline'>
                  <Trash2 className="h-8 w-8 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-[35%]">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-4xl font-bold">Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <h2 className="font-2xl font-bold">User Details</h2>
                  <p className="mt-1">Name : <span className="font-semibold">Mohanraj M</span> </p>
                  <p className="mt-1">Email : <span className="font-semibold">user@abc.cc</span> </p>
                  <p className="mt-1">Phone : <span className="font-semibold">234567</span> </p>
                  <p className="mt-1">Address : <span className="font-semibold">abc ,cde -123</span> </p>

                </div>
                <h2 className="font-2xl font-bold">Payment Method</h2>
                <div className="grid gap-2">
                  <RadioGroup defaultValue="comfortable" className="flex flex-row justify-between items-center">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">UPI</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Card</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3">COD</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default UserCart