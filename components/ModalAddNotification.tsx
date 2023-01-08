import React, { useState, useEffect } from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input, Switch } from '@rneui/base';
import { apiNotification } from '../interface/api';
import { stylesGlobal } from '../util/styleGlobal';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { PostNotification, UpdateNotification } from '../api/notification';
import { setNotification, updateNotification } from '../redux/slice/notificationSlice';
import { formatDateToForDisplay } from '../util/function';
import CustomButton from './CustomButton';



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
        setLoading(false);
        setVisible(false)

    }


    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={() => closeModal()}
            transparent={true}

        >

            <View style={[stylesGlobal.padding, { justifyContent: 'center', minHeight: "100%" }]}>
                <View style={{ backgroundColor: "#fff", elevation: 5, borderRadius: 5, padding: 10 }}>
                    <View style={{ marginBottom: 17 }}>
                        <Text style={
                            {
                                textAlign: "center",
                                fontSize: 13,
                                color: "#1F1F35",
                                fontFamily: "Roboto-SlabBold",

                            }
                        }>Date de début de la notification : {formatDateToForDisplay(new Date(form.date))}</Text>

                    </View>

                    {
                        loading &&
                        <ActivityIndicator animating={loading} size="large" color="#000" style={{ position: "absolute", top: "40%", left: "40%", zIndex: 10 }} />
                    }

                    <Input
                        label="Titre"
                        placeholder='Titre de la notification'
                        value={form.title}
                        placeholderTextColor={"#475D5B"}
                        labelStyle={{ color: "#1F1F35" }}
                        onChangeText={(text) => setForm({ ...form, title: text })}
                        errorMessage={form.errorTitle}
                    />
                    <Input
                        label="Description"
                        placeholder='Description de la notification'
                        value={form.description}
                        placeholderTextColor={"#475D5B"}
                        labelStyle={{ color: "#1F1F35" }}
                        onChangeText={(text) => setForm({ ...form, description: text })}
                        errorMessage={form.errorDescription}
                    />
                    <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <Text>Répéter la notification tant quelle n'est pas valider</Text>
                        <Switch value={form.isRepeat} onValueChange={(Boolean) => {
                            setForm({ ...form, isRepeat: Boolean })
                        }}
                            thumbColor={"#D77333"}
                        />
                    </View>

                    <View style={stylesGlobal.center}>
                        <CustomButton
                            label={{
                                text: "Modifier la date de début de la notification",
                                size: 14,
                            }}

                            onPress={showDatepicker}
                            icon={
                                <Icon
                                    name="calendar"
                                    type="font-awesome"
                                    color="#fff"
                                    containerStyle={{ marginRight: 10 }}
                                />
                            }
                            paddingHorizontal={-85}

                        />
                        <CustomButton
                            label={{
                                text: "Ajouter la notification",
                                size: 14,
                            }}

                            onPress={() => submit()}
                            icon={
                                <Icon
                                    name="save"
                                    type="font-awesome"
                                    color="#fff"
                                    containerStyle={{ marginRight: 10 }}
                                />
                            }


                        />
                    </View>
                </View>
            </View>

        </Modal>
    )


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
}
