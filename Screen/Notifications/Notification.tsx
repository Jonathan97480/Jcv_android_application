import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllNotifications } from '../../api';
import { deleteNotification, setAllNotification } from '../../redux/slice/notificationSlice';
import { CustomButton, Filters, MicroCard, ModalAddNotification, ModalNotification, TitleScreen } from '../../components';
import { apiNotification } from '../../interface/api';
import { User } from '../../interface';
import { stylesGlobal } from '../../util/styleGlobal';
import { ScrollView } from 'react-native-gesture-handler';
import { DeleteNotification } from '../../api/notification';
import { filtersNotifications, fixeText, formatDateToForDisplay } from '../../util/function';
import { Icon, Image } from '@rneui/base';






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
        <SafeAreaView style={[styles.container, stylesGlobal.colorBackGroundApp]}>
            <View style={[stylesGlobal.container, stylesGlobal.padding]} >

                <TitleScreen
                    titre="Notifications"
                    image={<Image source={require('../../assets/notification-icon.png')}
                        resizeMode="cover"
                        style={{
                            width: 34,
                            height: 34,
                            tintColor: "#1F1F35",
                            marginLeft: 5,
                        }}
                    />}

                />



                <Filters
                    label='Filtres'
                    filter={[
                        { label: "Active", isDefault: true, value: "active" },
                        { label: "Validée", value: "validated" },
                        { label: "Avenir", value: "coming" },

                    ]}
                    params={
                        {
                            colorActive: "#9747FF",
                            colorInactive: "#55585D",
                            isUnderlineActive: true,
                        }
                    }
                    onPress={(value) => {
                        setCurentValueFilter(value);
                        const newNotificationFilter = filtersNotifications(notificationsReducer, value);
                        setFilterNotifications(newNotificationFilter);
                    }}
                />
                <ScrollView
                    style={
                        {
                            maxHeight: '75%',
                            minHeight: '75%',
                        }
                    }
                >
                    {
                        filterNotifications.map((notification: apiNotification) => {
                            return (
                                <MicroCard
                                    key={notification.id + "-notification"}
                                    title={fixeText(notification.title, 25, "...")}
                                    description={notification.description}
                                    status={{
                                        text: formatDateToForDisplay(new Date(notification.date)),
                                        color: "#1F1F35",
                                    }}
                                    chevronDisabled={true}
                                    isSwipeable={true}
                                    onPress={() => {
                                        setCurentNotification(notification);
                                        setModalView(true);
                                    }}
                                    iconLeft={
                                        <Image
                                            source={require('../../assets/notification-icon.png')}
                                            resizeMode="cover"
                                            style={{
                                                width: 34,
                                                height: 34,
                                                tintColor: "#1F1F35",
                                                marginRight: 5,
                                            }}
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
                <View style={stylesGlobal.center}>
                    <CustomButton
                        label={
                            {
                                text: "Ajouter une notification",
                            }
                        }
                        onPress={() => {
                            setCurentNotification(undefined);
                            setModalViewAddNotification(true);
                        }}
                        icon={undefined}
                    />
                </View>

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

        alignItems: 'center',
        justifyContent: 'center',
    },
});