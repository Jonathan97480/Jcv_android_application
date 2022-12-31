import { API_URL, API_IDENTIFIER, API_PASSWORD } from '@env'
import { Form } from '../components/ModalAddNotification';
import { User } from '../interface';
import { apiNotification } from '../interface/api';


export async function GetAllNotifications(user: User): Promise<apiNotification[]> {
    const curentDate = new Date();
    const date = curentDate.getFullYear() + "-" + fixeNumber((curentDate.getMonth() + 1)) + "-" + fixeNumber(curentDate.getDate());
    const url = `${API_URL}/api/notifications?filters[date_debut_notification][$lte]=${date}&filters[valider]=false`
    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.jwt}`,
        }
    });
    const data = await response.json();
    const notifications: apiNotification[] = [];

    for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        notifications.push({
            id: element.id,
            title: element.attributes.titre,
            description: element.attributes.description,
            isValidated: element.attributes.valider,
            repeated: element.attributes.repetition,
            date: element.attributes.date_debut_notification,
        });

    }
    return notifications;
}

export async function PostNotification(form: Form, user: User): Promise<apiNotification> {

    const response = await fetch(`${API_URL}/api/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.jwt}`,

        }
        ,
        body: JSON.stringify({
            data: {
                titre: form.title,
                description: form.description,
                date_debut_notification: form.date,
                repetition: form.isRepeat,

            }
        })
    });
    const data = await response.json();
    const notification: apiNotification = {
        id: data.data.id,
        title: data.data.attributes.titre,
        description: data.data.attributes.description,
        isValidated: data.data.attributes.valider,
        repeated: data.data.attributes.repetition,
        date: data.data.attributes.date_debut_notification,
    };
    return notification;
}

export async function DeleteNotification(id: number, user: User): Promise<boolean> {

    const response = await fetch(`${API_URL}/api/notifications/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.jwt}`,

        }
    });

    return response.status === 200;


}

export async function ValidateNotification(id: number, user: User): Promise<boolean> {


    const response = await fetch(`${API_URL}/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
            data: {
                valider: true,
            }
        })
    });

    return response.status === 200;

}

function fixeNumber(number: number): string {
    if (number < 10) {
        return "0" + number;
    }
    return number.toString();
}