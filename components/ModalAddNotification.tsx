import React, { useState } from 'react';
import { Modal, StyleSheet, View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { Button, Input, Switch } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiNotification } from '../interface/api';
import { stylesGlobal } from '../util/styleGlobal';

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    notification?: apiNotification;
}

interface Form {
    title: string;
    errorTitle: string;
    description: string;
    errorDescription: string;
    isRepeat: boolean;
}


export default function ModalAddNotification({ visible, setVisible, notification }: Props) {

    const formValue = getFormDefaultValues(notification);
    const [form, setForm] = useState<Form>(formValue);


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
                    <View>
                        <Text>Répéter la notification tous les jour jusque sa validation </Text>
                        <Switch value={form.isRepeat} onValueChange={(Boolean) => {
                            setForm({ ...form, isRepeat: Boolean })
                        }} />
                    </View>

                    <Button
                        title="Ajouter"
                        onPress={() => { }}

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

        }
    }
}
