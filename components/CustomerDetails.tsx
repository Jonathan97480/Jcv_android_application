import { Image } from '@rneui/base';
import React, { View, Text, StyleSheet, Modal, } from 'react-native';
import { Customer } from '../interface';
import { BackButton, Box } from '.';
import { stylesGlobal } from '../util/styleGlobal';
import ActionPAge from './ActionsPage';
import TitelScreen from './TitelScreen';
import { formatTextStatusCustomer, getColorStatusCustomers } from '../util/function';
import * as OpenAnything from 'react-native-openanything';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    customer: Customer;
    setEdit: (customer: Customer) => void;
    setDelete: (customer: Customer) => void;
}

export default function CustomerDetails({ visible, setVisible, customer, setDelete, setEdit }: Props) {




    return (
        <Modal

            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}

        >
            <BackButton
                nameOldScreen='Clients'
                nameScreen=''
                onPress={() => setVisible(false)}

            />
            <ScrollView>
                <View style={[stylesGlobal.colorBackGroundApp, stylesGlobal.padding]}>

                    <TitelScreen
                        titre="Clients Informations"
                        image={
                            <Image
                                style={{ width: 38, height: 38, tintColor: '#1F1F35', marginLeft: 10 }}
                                source={require('../assets/customers-icon.png')}
                            />
                        }
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


                    <Text style={styles.title}>{customer.attributes.nom}</Text>


                    <Box>
                        <Text style={[styles.sectionInfoTitle, { marginBottom: 17 }]}>Information de base</Text>
                        <View>

                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontFamily: 'Roboto-SlabBold',
                                }}>Status client</Text>
                                <View style={{
                                    width: "auto",
                                    paddingHorizontal: 10,
                                    justifyContent: 'center',
                                    backgroundColor: getColorStatusCustomers(customer.attributes.statut),
                                    padding: 5,
                                    borderRadius: 25,
                                    elevation: 5,

                                }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                        }}
                                    >{formatTextStatusCustomer(customer.attributes.statut)}</Text>
                                </View>
                            </View>
                        </View>


                        <InfoBlock
                            title='Email'
                            type='email'
                            item={customer.attributes.email}
                        />
                    </Box>

                    <Box>
                        <Text style={[styles.sectionInfoTitle, { marginBottom: 17 }]}>Adresse client</Text>
                        <InfoBlock
                            title='Ville'
                            type='text'
                            item={customer.attributes.ville}
                        />
                        <InfoBlock
                            title='Adresse'
                            type='text'
                            item={customer.attributes.address}
                        />
                        <InfoBlock
                            title='Code postal'
                            type='text'
                            item={customer.attributes.code_postal}
                        />
                    </Box>

                    <Box>
                        <Text style={[styles.sectionInfoTitle, { marginBottom: 17 }]}>Contact client</Text>
                        <InfoBlock
                            title='Telephone fixe'
                            type='number'
                            item={customer.attributes.telephone}
                        />
                        <InfoBlock
                            title='Telephone mobile'
                            type='number'
                            item={customer.attributes.telephone_mobile}
                        />
                        <InfoBlock
                            title='Fax'
                            type='number'
                            item={customer.attributes.faxe}
                        />
                    </Box>

                    <Box>

                        <InfoBlock
                            title='Description'
                            item={customer.attributes.description}
                        />

                    </Box>



                </View>
            </ScrollView>

        </Modal >
    );




}

const InfoBlock = ({ title, item, type = "text" }: {
    title: string,
    item: string | number | null
    type?: 'text' | 'number' | 'email'
}) => {
    if (Number.isNaN(item)) {
        item = null;
    }

    const itemColor = getItemColor(type)
    return (
        <>


            < View style={styles.sectionInfo} >
                <Text style={styles.sectionInfoTitle}>
                    {title} :
                </Text>
                <Text style={[styles.sectionInfoItem, { color: itemColor }]}
                    onPress={() => {
                        if (item && item.toString().length > 0) {
                            if (type === 'email') {
                                OpenAnything.Email(item?.toString() || '')
                            }
                            if (type === 'number') {
                                OpenAnything.Call(item?.toString() || '')
                            }
                        }
                    }}
                >
                    {item?.toString() || ' Non renseigné'}
                </Text>
            </View >

        </>
    )

}
const getItemColor = (_type: "text" | "number" | "email") => {
    switch (_type) {
        case "text":
            return "#5D5D5D"
        case "number":
            return "#D77333"
        case "email":
            return "#D77333"
        default:
            return "#5D5D5D"


    }

}
const styles = StyleSheet.create({
    title: {

        fontSize: 25,
        fontFamily: 'Roboto-SlabBold',
        textAlign: 'center',
        marginBottom: 17

    }, sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10

    }, sectionParagraph: {
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: 10
    }, sectionInfo: {

        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        alignItems: 'center'


    }, sectionInfoTitle: {
        fontSize: 16,
        fontFamily: 'Roboto-SlabBold',




    }, sectionInfoItem: {
        fontSize: 16,
        fontWeight: 'bold',

    }, button: {
        backgroundColor: 'red',
        width: 200,
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 12,
        textAlign: 'center'


    }, modalView: {
        height: '100%',
        margin: 20,
        justifyContent: 'center',

        alignItems: 'center',

    }, modalContent: {

        borderRadius: 20,
        padding: 20,
    }, modalItem: {
        marginBottom: 10,
    }

});
