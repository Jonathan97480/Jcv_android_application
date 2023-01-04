import React, { useEffect } from 'react';

import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootCustomersStackParamList } from '../../interface/navigation';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Customer } from '../../interface';
import { CustomerAdd } from '..';
import { stylesGlobal } from '../../util/styleGlobal';
import { CustomButton, MicroCard } from '../../components';
import { DeleteCustomer } from '../../api/customers';
import { deletedCustomer } from '../../redux/slice/customersSlice';


type ProfileScreenNavigationProp = StackNavigationProp<
    RootCustomersStackParamList

>;
export default function Customers() {



    const customers: Customer[] = useSelector((state: any) => state.customers.customers);
    const user = useSelector((state: any) => state.user.user);

    const [customersList, setCustomersList] = React.useState<Customer[]>(customers);
    const [curentCustomer, setCurentCustomer] = React.useState<Customer | undefined>();

    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const [isModalView, setIsModalView] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setCustomersList(customers);
    }, [customers])

    return (
        <SafeAreaView  >

            <View style={[stylesGlobal.container, stylesGlobal.padding]}>

                <Input
                    rightIcon={
                        <Icon
                            type='font-awesome'
                            name='search'
                            color={'#000'}
                            size={17}
                        />
                    }
                    onChange={(e) => {
                        const value = e.nativeEvent.text;
                        const filteredCustomers = customers.filter((customer) => {
                            return customer.attributes.nom.toLowerCase().includes(value.toLowerCase())
                        })
                        setCustomersList(filteredCustomers)
                    }}
                    containerStyle={styles.inputSearch}
                    inputStyle={{ textDecorationLine: 'none' }}

                    placeholder="Rechercher un client" />

                <ScrollView
                    style={{
                        maxHeight: '80%',
                        minHeight: '80%',
                    }}
                >
                    <View style={[stylesGlobal.container, stylesGlobal.padding]}>

                        <Text style={stylesGlobal.title}>Liste des clients</Text>


                        {
                            customersList.map((customer, index) => {
                                return (

                                    <MicroCard
                                        key={index + "-customer"}
                                        title={customer.attributes.nom}
                                        status={customer.attributes.statut}
                                        isSwipeable={true}
                                        iconLeft={
                                            <Icon
                                                style={{ marginRight: 5 }}
                                                type='font-awesome'
                                                name='user'
                                                color={'blue'}
                                                size={40}
                                            />
                                        }
                                        onPress={() => {
                                            navigation.navigate("CustomerDetails", { customer: customer })
                                        }}
                                        onDeletedPress={() => {
                                            Alert.alert(
                                                //title
                                                'suppression de client',
                                                //body
                                                'Voulez vous vraiment supprimer ce client ?',
                                                [
                                                    {
                                                        text: 'oui', onPress: async () => {
                                                            await DeleteCustomer(customer, user)
                                                            dispatch(deletedCustomer(customer))

                                                        }
                                                    },
                                                    {
                                                        text: 'non',
                                                        onPress: () => console.log('No Pressed'),
                                                        style: 'cancel',
                                                    },
                                                ],
                                                { cancelable: false }
                                                //clicking out side of alert will not cancel
                                            );

                                        }}
                                        onEditPress={() => {
                                            setCurentCustomer(customer)
                                            setIsModalView(true)

                                        }}
                                    />

                                )
                            })
                        }

                    </View>
                </ScrollView>
                <CustomButton
                    label={'Ajouter un client'}
                    onPress={() => {
                        setCurentCustomer(undefined)
                        setIsModalView(true)
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
            <CustomerAdd
                isModalView={isModalView}
                setModalView={setIsModalView}
                curentCustomer={curentCustomer}
            />
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