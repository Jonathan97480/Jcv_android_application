import { API_URL, API_IDENTIFIER, API_PASSWORD } from "@env"
import { User } from "../interface";

export const UserLogin = async (): Promise<User> => {

    return new Promise((resolve, reject) => {


        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',


            },

            body: JSON.stringify({
                identifier: API_IDENTIFIER,
                password: API_PASSWORD
            })




        }

        fetch(API_URL + '/api/auth/local', option)
            .then(response => response.json(), error => reject(error))
            .then(data => {

                const user: User = data.user;
                user.jwt = data.jwt;
                resolve(user);

            }
                , error => reject(error))

    })





}




