import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, ActivityIndicator, Text, ScrollView, ActivityIndicatorBase } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Switch } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiNotification } from '../interface/api';
import { stylesGlobal } from '../util/styleGlobal';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { PostNotification, UpdateNotification } from '../api/notification';
import { setNotification, updateNotification } from '../redux/slice/notificationSlice';
import { formatDateToForDisplay } from '../util/function';



interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    notification?: apiNotification;
}

export interface Form {
    title: string;
    errorTitle: string;
    description: string;
    errorDescription: string;
    isRepeat: boolean;
    date: Date;
}


export default function ModalAddNotification({ visible, setVisible, notification }: Props) {


    const [date, setDate] = useState<Date>(new Date());
    const [form, setForm] = useState<Form>({} as Form);

    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setForm({ ...form, date: currentDate });
    };

    const showMode = (currentMode: "date" | "time") => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    const showDatepicker = () => {
        showMode('date');
    };

    useEffect(() => {

        setForm(getFormDefaultValues(notification));

    }, [notification]);

    const closeModal = () => {
        setForm(resetForm());
        setDate(new Date());
        setVisible(false)
        setLoading(false);
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}
            transparent={true}

        >

            <View style={[stylesGlobal.padding, { justifyContent: 'center', minHeight: "100%" }]}>
                <View style={{ backgroundColor: "#fff", elevation: 5, borderRadius: 5, padding: 10 }}>

                    <Input
                        label="Titre"
                        value={form.title}
                        onChangeText={(text) => setForm({ ...form, title: text })}
                        errorMessage={form.errorTitle}
                    />
                    <Input
                        label="Description"
                        value={form.description}
                        onChangeText={(text) => setForm({ ...form, description: text })}
                        errorMessage={form.errorDescription}
                    />
                    <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <Text>Répéter la notification tous les jour jusque sa validation </Text>
                        <Switch value={form.isRepeat} onValueChange={(Boolean) => {
                            setForm({ ...form, isRepeat: Boolean })
                        }} />
                    </View>
                    <View>
                        <Text>Date de début de la notification</Text>
                        <Text>{formatDateToForDisplay(new Date(form.date))}</Text>
                        <Button
                            containerStyle={{ width: "100%", marginTop: 10, marginBottom: 10, elevation: 5 }}
                            icon={{ name: "calendar", type: "font-awesome", color: "#fff", containerStyle: { marginRight: 10 } }}
                            onPress={showDatepicker} title="Changer la date de début" />
                    </View>


                    <Button
                        title="Ajouter"
                        onPress={() => { submit(); }}
                        containerStyle={{ elevation: 5 }}

                    />
                </View>
            </View>

        </Modal>
    )

    function getFormDefaultValues(notification: apiNotification | undefined): Form {

        if (notification !== undefined) {
            return {
                title: notification.title,
                errorTitle: "",
                description: notification.description,
                errorDescription: "",
                isRepeat: notification.repeated,
                date: new Date(notification.date),
            }
        }
        return resetForm();
    }
    function resetForm() {
        return {
            title: "",
            errorTitle: "",
            description: "",
            errorDescription: "",
            isRepeat: false,
            date: date,

        }
    }

    function submit() {

        setLoading(true);

        if (form.title === "") {
            setForm({ ...form, errorTitle: "Le titre est obligatoire" })
            setLoading(false);
            return;
        }
        if (notification !== undefined) {

            UpdateNotification(notification.id, form, user).then((res: apiNotification) => {
                console.log("BIG RES", res);
                dispatch(updateNotification(res))
                closeModal();

            }).catch((err) => {
                console.error(err);
                closeModal();
            })

        } else {

            PostNotification(form, user).then((res: apiNotification) => {

                dispatch(setNotification(res))
                closeModal();


            }).catch((err) => {
                console.error(err);
                closeModal();
            })
        }


    }


}
