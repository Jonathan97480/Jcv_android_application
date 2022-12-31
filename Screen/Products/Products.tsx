
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllCategories, GetCustomers, UserLogin } from '../../api';
import { apiCategories, apiProduct } from '../../interface';
import { login, setIsLogged } from '../../redux/slice/userSlice';
import { setData, setLoading } from '../../redux/slice/customersSlice';
import { SousCategoryCard } from '../../components';
import { useDispatch } from 'react-redux'
import { stylesGlobal } from '../../util/styleGlobal';



export default function Products() {


    const [products, setProducts] = useState<apiProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<apiCategories[]>([]);



    const dispatch = useDispatch();

    useEffect(() => {
        GetAllCategories().then((categories) => {
            setCategories(categories);
            setIsLoading(false);
        });

        UserLogin().then((_user) => {
            dispatch(login(_user));
            dispatch(setIsLogged(true));

            GetCustomers(_user).then((_customers) => {

                dispatch(setData(_customers));
                dispatch(setLoading());

            });


        });

        return () => {
            setCategories([]);
        }

    }, []);



    return (
        <SafeAreaView style={{ padding: 8 }}>
            <View style={[stylesGlobal.container, stylesGlobal.padding]}>

                <ScrollView  >

                    {
                        isLoading ? <ActivityIndicator /> :
                            categories.map((categorie) => {
                                return (
                                    <View key={categorie.id}>
                                        <View style={[styles.cat, { backgroundColor: categorie.attributes.color }]}>
                                            <Text style={styles.titleCat}>{categorie.attributes.nom}</Text>
                                        </View>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                            {
                                                categorie.attributes.sous_categories.data.map((sousCategorie) => {
                                                    return (
                                                        <SousCategoryCard sousCategory={sousCategorie} key={sousCategorie.id} />
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                )

                            })
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",

    },
    cat: {
        width: "100%",
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    titleCat: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    }


});