import { Restaurant } from "@/types"; // Assuming types are correctly imported
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner"; // Assuming `sonner` is a notification library
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = ()=>{
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantRequest = async(): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if(!response.ok){
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    };

    const {data:restaurant,isLoading}=useQuery(
        "fetchMyRestaurant", 
        getMyRestaurantRequest
    )

    return {restaurant, isLoading};
}

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (
        restaurantFormData: FormData
    ): Promise<Restaurant> => {
        
    console.log("On Save got triggered")
        try {

            const accessToken = await getAccessTokenSilently();
            const userID = uuidv4();
            restaurantFormData.append('userId', userID);

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

export const useUpdateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updatetRestaurantRequest = async(restaurantFormdata: FormData)=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormdata
        })

        if(!response) {
            throw new Error("Failed to update restaurant")
        }

        return response.json();
    }
}