import { allOrders } from "@/api/api"
import Loading from "@/components/shared/Loading"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { OrdersType } from "@/types"
import { useEffect, useState } from "react"


const UserOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {
        try {
            const response = await allOrders()
            if (response.status === 200) {
                setOrders(response.data)
                setLoading(false)
            }
        } catch (error) {
            console.error("Error Fetching Orders !")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    if (loading) {
        <Loading />
    }
    return (
        <div className="p-4 flex justify-center items-center w-full">
            {(orders.length === 0 && !loading) ? (
                <div className="text-center">
                    No Orders Available !!
                </div>
            ) : (
                <Table className="w-full bg-gray-50 p-4 rounded-md">
                    <TableHeader className="bg-gray-300">
                        <TableRow>
                            <TableHead>Item Summary</TableHead>
                            <TableHead>Total Price</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order: OrdersType, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{order.items.map((item, index) => (<span key={index}>{item.qty} </span>))}</TableCell>
                                <TableCell>{order.totalAmount}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.createdAt}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            )
            }
        </div>
    )
}

export default UserOrders