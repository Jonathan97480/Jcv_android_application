import { Button, Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ValidateNotification } from '../api/notification';
import { apiNotification } from '../interface/api';
import { stylesGlobal } from '../util/styleGlobal';
import { useSelector, useDispatch } from 'react-redux';
import { updateNotification } from '../redux/slice/notificationSlice';


interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    notification: apiNotification;
}

export default function ModalNotification({ visible, setVisible, notification }: Props) {

    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}
        >
            <View
                style={stylesGlobal.padding}

            >

                <Icon
                    onPress={() => setVisible(false)}
                    containerStyle={{ padding: 10, backgroundColor: "red", borderRadius: 50, width: 50, height: 50, alignItems: "center" }}
                    name="left"
                    type='antdesign'
                    size={30}
                    iconStyle={{ alignSelf: "center", fontWeight: "bold" }}
                    color="black"
                />


                <View>
                    <Text>{notification.title}</Text>
                    <Text>{notification.isValidated ? "Notification Marquer comme valider" : "Notification Marquer comme a faire"}</Text>
                    <Text>{notification.description}</Text>
                    <Text>{notification.date}</Text>
                    <Button
                        title="Marquer la notification comme fait"
                        onPress={() => {

                            ValidateNotification(notification.id, user).then((res) => {
                                if (res) {
                                    const newNotification = { ...notification, isValidated: true }
                                    dispatch(updateNotification(newNotification))
                                    setVisible(false)
                                }
                            },)
                        }}

                    />
                </View>
            </View>
        </Modal>
    );
} 