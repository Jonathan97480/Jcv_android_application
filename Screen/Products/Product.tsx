import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllProductsByCategory } from '../../api';
import { CardProduct } from '../../components';
import { apiProduct } from '../../interface';
import { stylesGlobal } from '../../util/styleGlobal';


export default function Products(props: any) {

    /* get params navigation */
    const { route } = props;
    const { params } = route;
    const { CatId, title } = params;

    const [products, setProducts] = useState<apiProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [catName, setCatName] = useState<string>("");
    const [catColor, setCatColor] = useState<string>("");

    const dispatch = useDispatch();





    useEffect(() => {


        GetAllProductsByCategory(CatId).then((_products) => {
            setProducts(_products);
            setIsLoading(false);

            _products.length > 0 ? setCatName(_products[0].attributes.category.data.attributes.nom) : 'Aucun produits disponible';
            _products.length > 0 ? setCatColor(_products[0].attributes.category.data.attributes.color) : 'red';


        }
        );
    }, [])

    return (
        <SafeAreaView style={{ padding: 8 }} >
            <View style={[stylesGlobal.container, stylesGlobal.padding]}>
                {
                    isLoading ? <ActivityIndicator /> :
                        <View>
                            <View style={[styles.cat, { backgroundColor: catColor }]}>
                                <Text style={styles.titleCat}>{catName}</Text>
                            </View>
                            <Text style={[styles.titleCat, { color: 'black' }]}>{title}</Text>
                            <ScrollView scrollEnabled={true} showsHorizontalScrollIndicator={false} horizontal={false} >
                                <View style={styles.container}>
                                    {

                                        products.map((product) => {
                                            return (
                                                <CardProduct products={product} key={product.id} />
                                            )
                                        })
                                    }
                                </View>

                            </ScrollView >
                        </View>
                }
            </View>
        </SafeAreaView>
    );
}





const styles = StyleSheet.create({
    container: {

        paddingTop: "5%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: "100%",


    },
    cat: {
        width: "100%",
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    titleCat: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    }
});

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}

