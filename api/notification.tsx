import { API_URL, API_IDENTIFIER, API_PASSWORD } from '@env'
import { User } from '../interface';
import { apiNotification } from '../interface/api';


export async function GetAllNotifications(user: User): Promise<apiNotification[]> {
    const response = await fetch(`${API_URL}/api/notifications`, {
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
            date: "2021-01-01"
        });

    }
    return notifications;
}