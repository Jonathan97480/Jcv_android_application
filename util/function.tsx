import { apiNotification } from "../interface/api";


export function fixeNumber(number: number): string {
    if (number < 10) {
        return "0" + number;
    }
    return number.toString();
}


export function formatDateToForDataBase(date: Date): string {

    const dateString = date.getFullYear() + "-" + fixeNumber((date.getMonth() + 1)) + "-" + fixeNumber(date.getDate());
    return dateString;
}

export function formatDateToForDisplay(date: Date): string {


    const dateString = fixeNumber(date.getDate()) + "/" + fixeNumber((date.getMonth() + 1)) + "/" + date.getFullYear();
    return dateString;
}

export function fixeText(text: string, length: number, addEndText?: string): string {
    if (text.length > length) {
        return text.substring(0, length) + (addEndText ? addEndText : "");
    }
    return text;
}


export const filtersNotifications = (notifications: apiNotification[], value: string) => {

    const curentDate = new Date();

    switch (value) {
        case 'active':

            const activeNotifications: apiNotification[] = [];

            notifications.map((notification) => {
                if (new Date(notification.date) < curentDate) {
                    if (notification.isValidated === false) {
                        activeNotifications.push(notification);
                    }
                }
            })

            return activeNotifications;


        case 'validated':

            return notifications.filter((notification) => notification.isValidated === true);


        case 'coming':

            const comingNotifications: apiNotification[] = [];

            notifications.map((notification) => {
                if (new Date(notification.date) > curentDate) {
                    comingNotifications.push(notification);
                }
            })

            return comingNotifications;


        default:
            return notifications;


    }

}

