
import { Customer, User } from "../interface";
import { API_URL } from "@env";
import { formCustomer } from "../components/CustomerAdd";



export const GetCustomers = async (user: User): Promise<Customer[]> => {

    const header = new Headers();
    header.append('Authorization', 'Bearer ' + user.jwt);

    const requestOptions = {
        method: 'GET',
        headers: header,
    }

    const response = await fetch(`${API_URL}/api/clients?populate=*`, requestOptions);
    const data = await response.json();
    console.debug('dataCustomer:', data);
    const customers: Customer[] = data.data;
    return customers;
}

export const UpdateCustomer = async (customer: Customer, user: User): Promise<Customer> => {

    const header = new Headers();
    header.append('Authorization', 'Bearer ' + user.jwt);
    header.append('Content-Type', 'application/json');



    const requestOptions = {
        method: 'PUT',
        headers: header,

        body: JSON.stringify({
            data: {

                nom: customer.attributes.nom,
                prenom: customer.attributes.prenom,
                statut: customer.attributes.statut,
                telephone: customer.attributes.telephone,
                telephone_mobile: customer.attributes.telephone_mobile,
                faxe: customer.attributes.faxe,
                address: customer.attributes.address,
                code_postal: customer.attributes.code_postal,
                email: customer.attributes.email,
                description: customer.attributes.description,
                ville: customer.attributes.ville,


            }

        })
    }

    const response = await fetch(`${API_URL}/api/clients/${customer.id}`, requestOptions);
    const data = await response.json();
    console.debug('dataCustomer:', data);
    const customerUpdated: Customer = data.data;
    return customerUpdated;

}

export const AddCustomer = async (form: formCustomer, user: User): Promise<Customer> => {

    console.log("USER : ", user);

    const header = new Headers();
    header.append('Authorization', 'Bearer ' + user.jwt);
    header.append('Content-Type', 'application/json');



    const requestOptions = {
        method: 'POST',
        headers: header,

        body: JSON.stringify({
            data: {
                nom: form.nom,
                prenom: form.prenom,
                statut: "prospection",
                telephone: parseInt(form.telephone),
                telephone_mobile: parseInt(form.telephone_mobile),
                faxe: parseInt(form.faxe),
                address: form.address,
                code_postal: form.code_postal,
                email: form.email,
                description: form.description,
                ville: form.ville,


            }
        })
    }

    const response = await fetch(`${API_URL}/api/clients`, requestOptions)
    const data = await response.json();
    console.debug('dataCustomer:', data);
    const customerAdded: Customer = data.data;

    return customerAdded;

}

export const DeleteCustomer = async (customer: Customer, user: User): Promise<boolean> => {

    const header = new Headers();
    header.append('Authorization', 'Bearer ' + user.jwt);
    header.append('Content-Type', 'application/json');


    const requestOptions = {
        method: 'DELETE',
        headers: header,


    }


    const response = await fetch(`${API_URL}/api/clients/${customer.id}`, requestOptions)
    const data = await response.json();


    return data.status == 200;
}

export const SetStatusCustomer = async (customerId: number, user: User, statu: string): Promise<Customer> => {

    const header = new Headers();
    header.append('Authorization', 'Bearer ' + user.jwt);
    header.append('Content-Type', 'application/json');



    const requestOptions = {
        method: 'PUT',
        headers: header,

        body: JSON.stringify({
            data: {
                statut: statu
            }
        })
    }

    const response = await fetch(`${API_URL}/api/clients/${customerId}`, requestOptions)
    const data = await response.json();
    console.debug('dataCustomer:', data);
    const customerUpdated: Customer = data.data;
    return customerUpdated;

}

