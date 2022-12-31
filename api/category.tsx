

import { apiCategories, apiProduct } from "../interface";
import { API_URL, API_IDENTIFIER, API_PASSWORD } from '@env'


export async function GetAllCategories(): Promise<apiCategories[]> {
    return new Promise((resolve, reject) => {

        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

        }

        fetch(API_URL + '/api/categories?populate[0]=sous_categories.image', option)

            .then(response => response.json(), error => reject(error))
            .then(data => {
                const categories: apiCategories[] = data.data;

                resolve(categories);

            }, error => reject(error))

    })

}


export async function GetAllProductsByCategory(id: number): Promise<apiProduct[]> {

    return new Promise((resolve, reject) => {

        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },
            url: API_URL + '/api/produits?populate[0]=images&populate[1]=sous_categories&populate[2]=category&populate[3]=documentation&filters[sous_categories][id][$eq]=' + id + '&populate=*',
        }

        fetch(option.url, option)
            .then(response => response.json())
            .then(data => {
                const products: apiProduct[] = data.data;

                resolve(products);

            })
    })


}