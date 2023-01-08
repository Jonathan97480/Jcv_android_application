import { Icon, Switch } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { ValidateNotification } from '../api/notification';
import { apiNotification } from '../interface/api';
import { stylesGlobal } from '../util/styleGlobal';
import { useSelector, useDispatch } from 'react-redux';
import { updateNotification } from '../redux/slice/notificationSlice';
import CustomButton from './CustomButton';

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

    const [isValidated, setIsValidated] = useState<boolean>(notification.isValidated);

    useEffect(() => {
        setIsValidated(notification.isValidated);
    }, [notification])


    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setVisible(false)}


        >

            <View style={[stylesGlobal.center, { minHeight: "100%", maxHeight: '100%' }]}>


                <View style={styles.container}>

                    <Text style={styles.title}>{notification.title}</Text>
                    <View style={styles.switchBox}>
                        <Text>Validée la notification</Text>
                        <Switch
                            thumbColor={"#D77333"}
                            value={isValidated}
                            onChange={() => {

                                ValidateNotification(notification.id, user).then((res) => {
                                    if (res) {
                                        const newNotification = { ...notification, isValidated: !isValidated }
                                        dispatch(updateNotification(newNotification))
                                        setIsValidated(!isValidated);

                                    }
                                },)
                            }}

                        />
                    </View>

                    <Text style={styles.description}>{notification.description}</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                        marginBottom: 5,

                    }}>
                        <CustomButton

                            btnType='invert'
                            label={
                                {
                                    text: "Supprimer",
                                    size: 20,
                                }
                            }
                            onPress={() => {
                                setVisible(false)
                                setDelete(notification.id)
                            }}
                            icon={
                                <Icon
                                    name="trash"
                                    type='feather'
                                    size={20}
                                    color="#D77333"
                                    style={{ marginRight: 5 }}

                                />
                            }
                        />
                        <View
                            style={{
                                width: 20,
                            }}
                        ></View>
                        <CustomButton

                            label={
                                {
                                    text: "Éditer",
                                    size: 20,
                                }
                            }
                            onPress={() => {
                                setVisible(false)
                                setEdit(notification)
                            }}
                            icon={
                                <Icon
                                    name="edit"
                                    type='feather'
                                    size={20}
                                    color="white"
                                    style={{ marginRight: 5 }}

                                />
                            }
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                    >
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                color: "#D77333",
                                fontFamily: "Roboto-SlabBold",
                            }}>Fermer la modal</Text>
                            <Icon
                                name="chevron-down"
                                type='feather'
                                size={20}
                                color="#D77333"
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: "90%",
        elevation: 5,
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: "Roboto-SlabBold",
        marginBottom: 17,
    },
    switchBox: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 17,
    },
    description: {
        fontSize: 12,
        fontFamily: "Roboto-SlabBold",
        marginBottom: 17,
        textAlign: "center",
    }
})