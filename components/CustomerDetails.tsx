import { Icon, Image } from '@rneui/base';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Customer } from '../interface';
import BackButton from './BackButton';
import Box from './Box';
import TitleScreen from './TitelScreen';
import ActionsPAge from './ActionsPage';
import { stylesGlobal } from '../util/styleGlobal';
import { formatTextStatusCustomer, getColorStatusCustomers } from '../util/function';
import * as OpenAnything from 'react-native-openanything';
import { SetStatusCustomer } from '../api/customers';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomer } from '../redux/slice/customersSlice';


interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    customer: Customer;
    setEdit: (customer: Customer) => void;
    setDelete: (customer: Customer) => void;
}


export default function CustomerDetails({ visible, setVisible, customer, setDelete, setEdit }: Props) {

    const [isModalView, setIsModalView] = React.useState(false);
    const [curentCustomer, setCurentCustomer] = React.useState<Customer>(customer);
    const customers = useSelector((state: any) => state.customers.customers);
    useEffect(() => {
        const index = customers.findIndex((item: Customer) => item.id === customer.id)
        customer = customers[index]
        setCurentCustomer(customer)
    }, [customers])

    return (
        <>
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

                        <TitleScreen
                            titre="Clients Informations"
                            image={
                                <Image
                                    style={{ width: 38, height: 38, tintColor: '#1F1F35', marginLeft: 10 }}
                                    source={require('../assets/customers-icon.png')}
                                />
                            }
                        />

                        <ActionsPAge
                            onPressDelete={() => {
                                setVisible(false)

                                setDelete(curentCustomer)

                            }}
                            onPressEdit={() => {
                                setVisible(false)
                                setEdit(curentCustomer)


                            }}

                        />


                        <Text style={styles.title}>{curentCustomer.attributes.nom}</Text>


                        <Box>
                            <Text style={[styles.sectionInfoTitle, { marginBottom: 17 }]}>Information de base</Text>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsModalView(true)
                                    }}
                                >
                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Roboto-SlabBold',
                                            fontSize: 18,
                                        }}>Status client</Text>
                                        <Text style={
                                            {
                                                fontFamily: 'Roboto-SlabBold',
                                                color: '#1F1F35',
                                                fontSize: 12,
                                                marginBottom: 5,
                                            }
                                        }>Toucher ici pour changer le status de votre client</Text>
                                        <View style={{
                                            width: "auto",
                                            paddingHorizontal: 10,
                                            justifyContent: 'center',
                                            backgroundColor: getColorStatusCustomers(curentCustomer.attributes.statut),
                                            padding: 5,
                                            borderRadius: 25,
                                            elevation: 5,
                                            marginBottom: 17,

                                        }}>
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                }}
                                            >{formatTextStatusCustomer(curentCustomer.attributes.statut)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <InfoBlock
                                title='Email'
                                type='email'
                                item={curentCustomer.attributes.email}
                            />
                        </Box>

                        <Box>
                            <Text style={[styles.sectionInfoTitle, { marginBottom: 17 }]}>Adresse client</Text>
                            <InfoBlock
                                title='Ville'
                                type='text'
                                item={curentCustomer.attributes.ville}
                            />
                            <InfoBlock
                                title='Adresse'
                                type='text'
                                item={curentCustomer.attributes.address}
                            />
                            <InfoBlock
                                title='Code postal'
                                type='text'
                                item={curentCustomer.attributes.code_postal}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    OpenAnything.Map(curentCustomer.attributes.address + ' ' + curentCustomer.attributes.code_postal + ' ' + curentCustomer.attributes.ville)
                                }}
                            >
                                <View style={stylesGlobal.center}>
                                    <Icon
                                        name='map-marker'
                                        type='font-awesome'
                                        color='#D77333'
                                        size={30}
                                        containerStyle={{ marginRight: 10 }}
                                    />
                                    <Text
                                        style={
                                            {
                                                color: '#D77333',
                                            }
                                        }
                                    >Afficher le client sur la map</Text>

                                </View>
                            </TouchableOpacity>
                        </Box>

                        <Box>
                            <Text style={[styles.sectionInfoTitle, { marginBottom: 17 }]}>Contact client</Text>
                            <InfoBlock
                                title='Telephone fixe'
                                type='number'
                                item={curentCustomer.attributes.telephone}
                            />
                            <InfoBlock
                                title='Telephone mobile'
                                type='number'
                                item={curentCustomer.attributes.telephone_mobile}
                            />
                            <InfoBlock
                                title='Fax'
                                type='number'
                                item={curentCustomer.attributes.faxe}
                            />
                        </Box>

                        <Box>

                            <InfoBlock
                                title='Description'
                                item={curentCustomer.attributes.description}
                            />

                        </Box>



                    </View>
                </ScrollView>
            </Modal >
            <EditStatutCustomer
                visible={isModalView}
                setVisible={setIsModalView}
                customerId={customer.id}
            />

        </>
    );




}


interface InfoBlockProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    customerId: number;
}
const EditStatutCustomer = ({ visible, setVisible, customerId }: InfoBlockProps) => {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={[stylesGlobal.center, { minHeight: "100%", maxHeight: "100%" }]}>
                <View style={{
                    backgroundColor: '#fff',

                }}>

                    <Box>
                        <Text style={[styles.sectionInfoTitle, { textAlign: "center", marginBottom: 17 }]}>Sélectionner un nouveau statu pour votre client</Text>
                        <View style={stylesGlobal.center}>
                            <TouchableOpacity
                                onPress={async () => {

                                    SetStatusCustomer(customerId, user, "AProspecter").then((_customer: Customer) => {
                                        dispatch(updateCustomer(_customer))
                                        setVisible(false)
                                    })

                                }}
                                style={
                                    {
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: "#6BBB8B",
                                        padding: 10,
                                        marginBottom: 17,
                                        elevation: 5,

                                    }
                                }
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>A Prospecter</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={async () => {

                                    SetStatusCustomer(customerId, user, "PasIntéresser").then((_customer: Customer) => {
                                        dispatch(updateCustomer(_customer))
                                        setVisible(false)
                                    })

                                }}
                                style={
                                    {
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: "#E41F1F",
                                        padding: 10,
                                        marginBottom: 17,
                                        elevation: 5,

                                    }
                                }>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Pas Intéresser</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={async () => {

                                    SetStatusCustomer(customerId, user, "DevisAValidee").then((_customer: Customer) => {
                                        dispatch(updateCustomer(_customer))
                                        setVisible(false)
                                    })

                                }}
                                style={
                                    {
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: "#D77333",
                                        padding: 10,
                                        marginBottom: 17,
                                        elevation: 5,

                                    }
                                }>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Devis A Validée</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={async () => {

                                    SetStatusCustomer(customerId, user, "CommandeEnCoure").then((_customer: Customer) => {
                                        dispatch(updateCustomer(_customer))
                                        setVisible(false)
                                    })

                                }}
                                style={
                                    {
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: "#308838",
                                        padding: 10,
                                        marginBottom: 17,
                                        elevation: 5,

                                    }
                                }>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Commande En Coure</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => {

                                    SetStatusCustomer(customerId, user, "ARecontacter").then((_customer: Customer) => {
                                        dispatch(updateCustomer(_customer))
                                        setVisible(false)
                                    })

                                }}
                                style={
                                    {
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: "#B0790F",
                                        padding: 10,
                                        marginBottom: 17,
                                        elevation: 5,
                                    }
                                }>
                                <Text style={{ color: "white", fontWeight: "bold" }}>A Recontacter</Text>
                            </TouchableOpacity>

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

                    </Box>


                </View>
            </View >
        </Modal >
    )

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
