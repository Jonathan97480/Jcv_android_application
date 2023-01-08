import React, { useEffect } from 'react';

import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { Icon, Image } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootCustomersStackParamList } from '../../interface/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { Customer } from '../../interface';
import { CustomerAdd, CustomerDetails, CustomButton, MicroCard, SearchBar, TitleScreen } from '../../components';
import { stylesGlobal } from '../../util/styleGlobal';
import { DeleteCustomer } from '../../api/customers';
import { deletedCustomer } from '../../redux/slice/customersSlice';
import { formatTextStatusCustomer, getColorStatusCustomers } from '../../util/function';


type ProfileScreenNavigationProp = StackNavigationProp<
    RootCustomersStackParamList

>;
export default function Customers() {



    const customers: Customer[] = useSelector((state: any) => state.customers.customers);
    const user = useSelector((state: any) => state.user.user);

    const [customersList, setCustomersList] = React.useState<Customer[]>(customers);
    const [curentCustomer, setCurentCustomer] = React.useState<Customer | undefined>();

    const [isModalView, setIsModalView] = React.useState(false);
    const [isModalDetailsView, setIsDetailsModalView] = React.useState(false);

    const dispatch = useDispatch();


    const setEdit = (customer: Customer) => {
        setCurentCustomer(customer);
        setIsModalView(true);
    }

    const setDelete = (customer: Customer) => {


        Alert.alert(
            "Suppression",
            "Voulez-vous supprimer ce client ?",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Oui", onPress: () => {
                        setCurentCustomer(undefined);
                        DeleteCustomer(customer, user)
                        dispatch(deletedCustomer(customer))
                    }
                }
            ]
        );
    }

    const closeModal = () => {
        setCurentCustomer({
            id: 0,
            attributes: {
                nom: '',
                prenom: '',
                email: '',
                telephone: null,
                telephone_mobile: null,
                faxe: null,
                description: '',
                statut: '',
                address: '',
                ville: '',
                code_postal: '',

            },
        });
        setIsModalView(false);
        setIsDetailsModalView(false);
    }

    useEffect(() => {
        setCustomersList(customers);
    }, [customers])


    return (
        <SafeAreaView style={[styles.container, stylesGlobal.colorBackGroundApp]} >

            <View style={[stylesGlobal.container, stylesGlobal.padding]}>
                <TitleScreen
                    titre="Clients"
                    image={
                        <Image
                            style={{ width: 38, height: 38, tintColor: '#1F1F35', marginLeft: 10 }}
                            source={require('../../assets/customers-icon.png')}
                        />
                    }
                />

                <SearchBar
                    onChangeText={(e) => {
                        const value = e;
                        const filteredCustomers = customers.filter((customer) => {
                            return customer.attributes.nom.toLowerCase().includes(value.toLowerCase())
                        })
                        setCustomersList(filteredCustomers)
                    }}


                    placeholder="Rechercher un client"

                />


                <ScrollView
                    style={{
                        maxHeight: '75%',
                        minHeight: '70%',
                        marginBottom: 17,
                    }}
                >
                    <View style={[stylesGlobal.container]}>

                        <Text style={{
                            fontSize: 15,
                            fontFamily: 'Roboto-SlabBold',
                            color: '#1F1F35',
                            marginBottom: 10,
                        }}>Liste des clients</Text>


                        {
                            customersList.map((customer, index) => {
                                return (

                                    <MicroCard
                                        key={index + "-customer"}
                                        title={customer.attributes.nom}
                                        status={{
                                            text: formatTextStatusCustomer(customer.attributes.statut),
                                            color: getColorStatusCustomers(customer.attributes.statut)
                                        }}
                                        isSwipeable={true}
                                        iconLeft={
                                            <Image
                                                source={require('../../assets/customers-icon.png')}
                                                resizeMode='cover'
                                                style={{ width: 34, height: 34, tintColor: '#1F1F35', marginRight: 5 }}
                                            />
                                        }
                                        onPress={() => {
                                            setCurentCustomer(customer)
                                            setIsDetailsModalView(true)
                                        }}

                                        onDeletedPress={() => {
                                            setDelete(customer)

                                        }}
                                        onEditPress={() => {
                                            setEdit(customer)

                                        }}
                                    />

                                )
                            })
                        }

                    </View>
                </ScrollView>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                    <CustomButton
                        label={{
                            text: 'Ajouter un client',
                        }}
                        btnType={'solid'}
                        onPress={() => {

                            setIsModalView(true)
                            setCurentCustomer(undefined)
                        }}
                        icon={
                            <Icon
                                type='font-awesome'
                                name='user-plus'
                                color={'white'}
                                size={17}
                                containerStyle={{ marginRight: 5 }}

                            />
                        }
                    />
                </View>

            </View>
            <CustomerAdd
                isModalView={isModalView}
                setModalView={closeModal}
                curentCustomer={curentCustomer}


            />
            {
                curentCustomer &&
                <CustomerDetails
                    visible={isModalDetailsView}
                    setVisible={closeModal}
                    customer={curentCustomer}
                    setDelete={setDelete}
                    setEdit={setEdit}
                />}
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',

    },
    inputSearch: {

        width: '100%',

        borderRadius: 8,
        marginTop: 16,

    },

});

