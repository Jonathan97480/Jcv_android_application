import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllNotifications } from '../../api';
import { deleteNotification, setAllNotification } from '../../redux/slice/notificationSlice';
import { CustomButton, Filters, MicroCard, ModalAddNotification, ModalNotification } from '../../components';
import { apiNotification } from '../../interface/api';
import { User } from '../../interface';
import { stylesGlobal } from '../../util/styleGlobal';
import { ScrollView } from 'react-native-gesture-handler';
import { DeleteNotification } from '../../api/notification';
import { filtersNotifications, fixeText, formatDateToForDisplay } from '../../util/function';
import { Icon } from '@rneui/base';




export default function Notification() {

    const userReducer: User = useSelector((state: any) => state.user.user);
    const notificationsReducer: apiNotification[] = useSelector((state: any) => state.notification.notification);

    const dispatch = useDispatch();
    const [modalView, setModalView] = useState<boolean>(false);
    const [modalViewAddNotification, setModalViewAddNotification] = useState<boolean>(false);

    const [filterNotifications, setFilterNotifications] = useState<apiNotification[]>([]);
    const [curentNotification, setCurentNotification] = useState<apiNotification | undefined>(undefined);
    const [curentValueFilter, setCurentValueFilter] = useState<string>("active");

    const _editNotification = (notification: apiNotification) => {
        setCurentNotification(notification);
        setModalViewAddNotification(true);
    };
    const _deleteNotification = (id: number) => {
        DeleteNotification(id, userReducer).then((res) => {
            if (res)

                GetAllNotifications(userReducer).then((res) => {
                    dispatch(deleteNotification(id));

                });


        });

    }

    const closeModal = () => {
        setModalView(false);
        setModalViewAddNotification(false);
        setCurentNotification({
            id: 0,
            title: "",
            description: "",
            date: "",
            isValidated: false,
            isPushed: false,
            repeated: false,
        });
    };



    useEffect(() => {
        const activeNotifications: apiNotification[] = filtersNotifications(notificationsReducer, curentValueFilter);
        setFilterNotifications(activeNotifications);
    }, [notificationsReducer]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={[stylesGlobal.container, stylesGlobal.padding]} >
                <Text style={{ marginBottom: 20, fontWeight: "bold", textAlign: "center", fontSize: 20 }}>Liste des notifications</Text>

                <Filters
                    label='Filtrer par'
                    filter={[
                        { label: "Active", isDefault: true, value: "active" },
                        { label: "Validée", value: "validated" },
                        { label: "Avenir", value: "coming" },

                    ]}
                    params={
                        {
                            colorActive: "#2e64e5",
                            isUnderlineActive: true,
                        }
                    }
                    onPress={(value) => {
                        setCurentValueFilter(value);
                        const newNotificationFilter = filtersNotifications(notificationsReducer, value);
                        setFilterNotifications(newNotificationFilter);
                    }}
                />
                <ScrollView>
                    {
                        filterNotifications.map((notification: apiNotification) => {
                            return (
                                <MicroCard
                                    key={notification.id + "-notification"}
                                    title={fixeText(notification.title, 25, "...")}
                                    description={notification.description}
                                    status={formatDateToForDisplay(new Date(notification.date))}
                                    chevronDisabled={true}
                                    isSwipeable={true}
                                    onPress={() => {
                                        setCurentNotification(notification);
                                        setModalView(true);
                                    }}
                                    iconLeft={
                                        <Icon
                                            style={{ marginRight: 10 }}
                                            name="bell"
                                            size={40}
                                            type="feather"
                                            color="#2e64e5"
                                        />
                                    }
                                    onDeletedPress={() => {

                                        _deleteNotification(notification.id);
                                    }}
                                    onEditPress={() => {
                                        _editNotification(notification);
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
                        setCurentNotification(undefined);
                        setModalViewAddNotification(true);
                    }}
                    icon={undefined}
                />

            </View>
            {
                curentNotification &&
                <ModalNotification
                    visible={modalView}
                    setVisible={closeModal}
                    notification={curentNotification}
                    setEdit={_editNotification}
                    setDelete={_deleteNotification}
                />}
            <ModalAddNotification
                visible={modalViewAddNotification}
                setVisible={closeModal}
                notification={curentNotification}

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