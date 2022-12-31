import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllNotifications } from '../../api';
import { deleteNotification, setAllNotification } from '../../redux/slice/notificationSlice';
import { CustomButton, MicroCard, ModalAddNotification, ModalNotification } from '../../components';
import { apiNotification } from '../../interface/api';
import { User } from '../../interface';
import { stylesGlobal } from '../../util/styleGlobal';
import { ScrollView } from 'react-native-gesture-handler';
import { DeleteNotification } from '../../api/notification';


export default function Notification() {

    const user: User = useSelector((state: any) => state.user.user);
    const notifications: apiNotification[] = useSelector((state: any) => state.notification.notification);
    const dispatch = useDispatch();
    const [modalView, setModalView] = useState<boolean>(false);
    const [modalViewAddNotification, setModalViewAddNotification] = useState<boolean>(false);

    const [curentNotification, setCurentNotification] = useState<apiNotification>({} as apiNotification);

    useEffect(() => {
        GetAllNotifications(user).then((res) => {

            if (res.length === 0) return;

            if (notifications.length === 0)
                dispatch(setAllNotification(res))

        });
    }, [notifications]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={[stylesGlobal.container, stylesGlobal.padding]} >
                <Text>Liste des notifications</Text>
                <ScrollView>
                    {
                        notifications.map((notification: apiNotification) => {
                            return (
                                <MicroCard
                                    key={notification.id + "-notification"}
                                    title={notification.title}
                                    description={notification.description}
                                    status={notification.date}
                                    chevronDisabled={true}
                                    isSwipeable={true}
                                    onPress={() => {
                                        setCurentNotification(notification);
                                        setModalView(true);
                                    }}
                                    deletedPress={() => {

                                        DeleteNotification(notification.id, user).then((res) => {
                                            if (res)
                                                dispatch(deleteNotification(notification.id));
                                        })
                                    }}
                                />
                            )
                        }
                        )
                    }
                </ScrollView>
                <CustomButton
                    label="Ajouter une notification"
                    onPress={() => {
                        setModalViewAddNotification(true);
                    }}
                    icon={undefined}
                />

            </View>
            <ModalNotification
                visible={modalView}
                setVisible={setModalView}
                notification={curentNotification}
            />
            <ModalAddNotification
                visible={modalViewAddNotification}
                setVisible={setModalViewAddNotification}

            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});