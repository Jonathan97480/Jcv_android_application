import { Icon } from '@rneui/base';
import { useState } from 'react';
import React, { View, Text, StyleSheet, Modal, } from 'react-native';
import { Customer } from '../interface';
import { CustomerAdd } from '../Screen';
import { BackButton, CustomButton } from '.';
import { stylesGlobal } from '../util/styleGlobal';
import ActionPAge from './ActionsPage';

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    customer: Customer;
    setEdit: (customer: Customer) => void;
    setDelete: (customer: Customer) => void;
}

export default function CustomerDetails({ visible, setVisible, customer, setDelete, setEdit }: Props) {


    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Modal

            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}

        >

            <BackButton
                nameOldScreen='Clients'
                nameScreen='Détails client'
                onPress={() => setVisible(false)}

            />

            <ActionPAge
                onPressDelete={() => {
                    setVisible(false)

                    setDelete(customer)

                }}
                onPressEdit={() => {
                    setVisible(false)
                    setEdit(customer)


                }}

            />
            <View style={[stylesGlobal.container, stylesGlobal.padding]}>
                <View>
                    <Text style={styles.title}>{customer.attributes.nom}</Text>
                </View>



                <CustomButton

                    onPress={() => setModalVisible(true)}
                    label={'Modifier le client'}
                    icon={
                        <Icon
                            name="edit"
                            size={15}
                            color="white"
                            type='font-awesome'
                            containerStyle={{ marginRight: 5 }}
                        />
                    }
                />

                <InfoBlock
                    title='Description'
                    item={customer.attributes.description}
                />

                <View style={styles.sectionInfo}>
                    <Text style={styles.sectionInfoTitle}>Informations client</Text>

                    <InfoBlock
                        title='Adresse'
                        item={customer.attributes.address}
                    />

                    <InfoBlock
                        title='Code postal'
                        item={customer.attributes.code_postal}
                    />

                    <InfoBlock
                        title='Ville'
                        item={customer.attributes.ville}
                    />


                    <InfoBlock
                        title='Telephone fixe'
                        item={customer.attributes.telephone}
                    />

                    <InfoBlock
                        title='Telephone mobile'
                        item={customer.attributes.telephone_mobile}
                    />

                    <InfoBlock
                        title='Fax'
                        item={customer.attributes.faxe}
                    />

                    <InfoBlock
                        title='Email'
                        item={customer.attributes.email}
                    />


                </View>
            </View>

            <CustomerAdd
                isModalView={modalVisible}
                setModalView={setModalVisible}
                curentCustomer={customer}
            />
        </Modal >
    );




}

const InfoBlock = ({ title, item }: {
    title: string,
    item: string | number | null
}) => {
    if (Number.isNaN(item)) {
        item = null;
    }

    return (
        <>
            {
                item === null || item === "" ? null :
                    < View style={styles.sectionInfo} >
                        <Text style={styles.sectionInfoTitle}>
                            {title}
                        </Text>
                        <Text style={styles.sectionInfoItem}>
                            {item}
                        </Text>
                    </View >
            }
        </>
    )
}

const styles = StyleSheet.create({
    title: {

        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10

    }, sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10

    }, sectionParagraph: {
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: 10
    }, sectionInfo: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center'


    }, sectionInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10

    }, sectionInfoItem: {
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: 10
    }, button: {
        backgroundColor: 'red',
        width: 200,
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center'


    }, modalView: {
        height: '100%',
        margin: 20,
        justifyContent: 'center',

        alignItems: 'center',

    }, modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    }, modalItem: {
        marginBottom: 10,
    }

});
