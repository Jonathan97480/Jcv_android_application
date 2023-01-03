import React from 'react';

import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootCustomersStackParamList } from '../../interface/navigation';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Customer } from '../../interface';
import { CustomerAdd } from '..';
import { stylesGlobal } from '../../util/styleGlobal';
import { CustomButton, MicroCard } from '../../components';

type ProfileScreenNavigationProp = StackNavigationProp<
    RootCustomersStackParamList

>;
export default function Customers() {

    const customers: Customer[] = useSelector((state: any) => state.customers.customers);

    const [customersList, setCustomersList] = React.useState<Customer[]>(customers);

    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const [isModalView, setIsModalView] = React.useState(false);

    return (
        <SafeAreaView style={{ padding: 8 }} >
            <View style={[stylesGlobal.container, stylesGlobal.padding, { paddingVertical: 0 }]}>

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
            </View>
            <ScrollView
                style={{
                    maxHeight: '87%',
                    minHeight: '87%',
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
                                    onPress={() => {
                                        navigation.navigate("CustomerDetails", { customer: customer })
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
            <CustomerAdd
                isModalView={isModalView}
                setModalView={setIsModalView}
                curentCustomer={null}
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