import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { allProducts } from "@/api/api"
import Loading from "@/components/shared/Loading"
import type { ProductType } from "@/types"
import { toast } from "sonner"

const UserProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {
        try {
            const response = await allProducts()
            if (response.status === 200) {
                setProducts(response.data)
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
    const handleAddCart = (product: ProductType) => {
        // var cartproducts = localStorage.getItem("products")
        // var newproduct = ...cartproducts+products;
        //update loacalstorage with newand old products
        // localStorage.setItem("products",newproducts)
        toast.success("Product added to cart")
        console.log(product)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="p-4 flex justify-center items-center w-full flex-col">
            <div className="w-full h-14 flex flex-row gap-2">
                <div className="w-[70%] h-full flex justify-center items-center">
                    <Input id="name" name="name" placeholder="Search" />
                </div>
                <div className="w-[20%] h-full flex justify-center items-center">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="furniture">Furniture</SelectItem>
                                <SelectItem value="home">Home</SelectItem>
                                <SelectItem value="fashion">Fashion</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[20%] h-full flex justify-center items-center">
                    <Button className="w-full">
                        <Search className="mr-2" /> Search
                    </Button>
                </div>
            </div>
            <div className="h-full w-full flex justify-start items-center mx-4 flex-wrap gap-4">
                {(products.length === 0 && !loading ) ? (
                    <div className="text-center">
                        No Products Available !!
                    </div>
                ) : (
                    <>
                        {products.map((product: ProductType, index) => (
                            <Card className="shadow-lg" key={index}>
                                <CardTitle>
                                    <p className="text-center font-bold line-clamp-1">{product.name} </p>
                                </CardTitle>
                                <CardContent className="flex justify-center items-center flex-col gap-2">
                                    <img src={product.image} alt="" className="object-fill h-24 w-28" />
                                    <p>{product.price}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => { handleAddCart(product) }}>
                                        <ShoppingCart />   Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                        }
                    </>
                )
                }

            </div>

        </div>
    )
}

export default UserProducts