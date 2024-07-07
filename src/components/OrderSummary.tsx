import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem) => void;
    increaseItemQuantity: (cartItem: CartItem) => void;
    decreaseItemQuantity: (cartItem: CartItem) => void;
}

const OrderSummary = ({ restaurant, cartItems, removeFromCart, increaseItemQuantity, decreaseItemQuantity }: Props) => {


    const getTotalCost = () => {
        const totalCost = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );
        const totalWithDelivery = totalCost + restaurant.deliveryPrice

        return totalWithDelivery.toFixed(2);
    };


    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>
                        Your Order
                    </span>
                    <span>
                        ₹{getTotalCost()}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div className="flex justify-between">
                        <span className="flex  items-center">
                            <button
                                onClick={() => decreaseItemQuantity(item)}
                                className = {`text-white bg-orange-400 w-4 h-4 flex items-center justify-center rounded-md text-xs leading-none mr-1
                                                ${item.quantity === 0 
                                                    ? 'opacity-50 cursor-not-allowed' 
                                                    : ''
                                                }`
                                            }
                                disabled={item.quantity === 0}
                            >
                                -
                            </button>
                            <Badge variant="outline" className="bg-orange-400">
                                {item.quantity}
                            </Badge>
                            <button
                                onClick={() => increaseItemQuantity(item)}
                                className="text-white bg-orange-400 w-4 h-4 flex items-center justify-center rounded-md text-xs leading-none ml-1"
                            >
                                +
                            </button>
                            <span className="ml-2">{item.name}</span>
                        </span>

                        <span className="flex items-center gap-1">
                            <Trash
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => removeFromCart(item)}
                            />
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>
                        Delivery
                    </span>
                    <span>
                        ₹{(restaurant.deliveryPrice).toFixed(2)}
                    </span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}

export default OrderSummary;