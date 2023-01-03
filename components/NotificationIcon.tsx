import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { apiNotification } from '../interface/api';
import { filtersNotifications } from '../util/function';



export default function NotificationIcon() {

    const notification: apiNotification[] = useSelector((state: any) => state.notification.notification);
    const activeNotifications: apiNotification[] = filtersNotifications(notification, 'active');
    return (
        <View style={styles.container}>

            <Image source={require('../assets/notification-icon.png')} style={styles.image} />
            {
                activeNotifications !== null && activeNotifications !== undefined && activeNotifications && activeNotifications.length > 0 ?
                    <View style={styles.pastille}>
                        <Text style={styles.pastilleText}>{activeNotifications.length}</Text>
                    </View> : null

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    image: {},
    pastille: {
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',

    }, pastilleText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }
})