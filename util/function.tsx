import { apiNotification } from "../interface/api";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native'
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

export async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}