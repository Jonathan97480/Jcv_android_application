import { Button, Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ValidateNotification } from '../api/notification';
import { apiNotification } from '../interface/api';
import { stylesGlobal } from '../util/styleGlobal';
import { useSelector, useDispatch } from 'react-redux';
import { updateNotification } from '../redux/slice/notificationSlice';
import BackButton from './BackButton';
import ActionPAge from './ActionsPage';


interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    notification: apiNotification;
    setEdit: (notification: apiNotification) => void;
    setDelete: (id: number) => void;

}

export default function ModalNotification({ visible, setVisible, notification, setDelete, setEdit }: Props) {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();





    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}

        >
            <BackButton
                nameOldScreen='Notification'
                nameScreen='Éditer notification'
                onPress={() => setVisible(false)}
            />
            <View
                style={stylesGlobal.padding}

            >

                <ActionPAge
                    onPressDelete={() => {
                        setVisible(false)
                        setDelete(notification.id)
                    }}
                    onPressEdit={() => {
                        setVisible(false)
                        setEdit(notification)
                    }}

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