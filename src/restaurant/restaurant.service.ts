/**
 * User type
 * @property email
 * @property username
 * @property password
 * @property profile_img
 * @property points
 */
export type Restaurant = {
    resto_id: string;
    resto_name: string;
    resto_desc: string;
    address: string;
    rating: number;
    img_path: string;
    vid_path: string;
    category: string;
}

/**
 * Get all Restaurant
 * @returns 
 */
export const getAllRestaurant = async (): Promise<Restaurant[]> => {
    return fetch('http://localhost:8080/api/listRestaurant.php')
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
            return [];
        });
        
}  
