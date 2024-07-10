import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    };

    const { data: restaurant, isLoading } = useQuery(
        "fetchMyRestaurant",
        getMyRestaurantRequest
    )

    return { restaurant, isLoading };
}

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (
        restaurantFormData: FormData
    ): Promise<Restaurant> => {

        console.log("On Save got triggered")
        try {

            const accessToken = await getAccessTokenSilently();
            console.log(accessToken)
            const userID = uuidv4();
            restaurantFormData.append('userId', userID);
            console.log(restaurantFormData)
            const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: restaurantFormData,
            });

            const responseData = await response.json();
            

            if (!response.ok) {
                console.error("Server Response:", responseData);
                let errorMessage = "Failed to create restaurant.";
                if (responseData.errors && responseData.errors.length > 0) {
                    errorMessage = responseData.errors.map((error: any) => error.msg).join("\n");
                } else {
                    errorMessage = responseData.message || response.statusText;
                }
                throw new Error(`Failed to create restaurant: ${errorMessage}`);
            }

            const data: Restaurant = responseData;
            return data;
        } catch (error: any) {
            console.error("Error:", error.message);
            throw new Error(error.message);
        }
    };

    const { mutate: createRestaurant, isLoading, error } = useMutation(
        "createRestaurant",
        createMyRestaurantRequest,
        {
            onSuccess: () => {
                toast.success("Restaurant created successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            },
            onError: (error: any) => {
                const errorMessage = error?.message || "Unable to create restaurant";
                console.error("Error creating restaurant:", errorMessage);
                toast.error(errorMessage);
            },
        }
    );

    return { createRestaurant, isLoading, error };
};

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updatetRestaurantRequest = async (
        restaurantFormdata: FormData
    ): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormdata
        })

        if (!response) {
            throw new Error("Failed to update restaurant")
        }

        return response.json();
    }

    const {
        mutate: updateRestaurant,
        isLoading,
        error,
        isSuccess
    } = useMutation(updatetRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant updated successfully!");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    if (error) {
        toast.error("Error: " + error.toString());
    }
    return { updateRestaurant, isLoading };
}

export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`,{
            headers: {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        if(!response.ok){
            throw new Error("Failed to get restaurant orders")
        }

        return response.json();
    }

    const { data: orders, isLoading } = useQuery(
        "fetchMyRestaurantOrders",
        getMyRestaurantOrdersRequest
    );

    return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
}

export const useUpdateMyRestaurantStatus = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateMyRestaurantStatus = async (
        updateStatusOrderRequest: UpdateOrderStatusRequest
    ) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(
            `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({status: updateStatusOrderRequest.status})
            }
        );

        if(!response.ok){
            throw new Error("Failed to update status");
        }

        return response.json();
    } 

    const { 
        mutateAsync: updateRestaurantStatus, 
        isLoading, 
        error, 
        isSuccess,
        reset,
    } =  useMutation(updateMyRestaurantStatus);

    if(isSuccess){
        toast.success("Order updated");
    }

    if(error){
        toast.error("Unable to update order " + error.toString());
        reset();
    }

    return { updateRestaurantStatus, isLoading };
}